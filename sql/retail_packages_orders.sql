-- File record of live retail checkout schema on project emgnkmidponhmccmrrwc.
-- Already applied. Reconstructs tables, RLS, seeds, and RPCs observed in production.
-- Current public prices: Opening $325 / Closing $325 / Combo $585
-- (10% off the $650 base only, $65). Heater + waterfall are in the base.
-- Spa is the only public add-on (opening $60 / closing $80). See
-- sql/retail_packages_heater_waterfall_included.sql.
-- amount_cents on retail_addons is unused; pricing truth is the season columns.

CREATE TABLE IF NOT EXISTS public.retail_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  kind text NOT NULL,
  amount_cents integer NOT NULL,
  visit_count integer NOT NULL DEFAULT 1,
  active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.retail_addons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  amount_cents integer,
  active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.retail_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id uuid NOT NULL REFERENCES public.retail_packages(id),
  status text NOT NULL DEFAULT 'pending_payment',
  amount_cents integer NOT NULL,
  discount_cents integer NOT NULL DEFAULT 0,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  line1 text NOT NULL,
  city text NOT NULL,
  zip text NOT NULL,
  state text NOT NULL DEFAULT 'NJ',
  stripe_checkout_session_id text,
  stripe_payment_intent_id text,
  stripe_customer_id text,
  qbo_invoice_id text,
  qbo_payment_id text,
  qbo_synced_at timestamptz,
  ticket_id uuid REFERENCES public.tickets(id),
  paid_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS retail_orders_stripe_session_uidx
  ON public.retail_orders (stripe_checkout_session_id)
  WHERE stripe_checkout_session_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS public.retail_order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.retail_orders(id) ON DELETE CASCADE,
  kind text NOT NULL,
  sku text NOT NULL,
  name text NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  unit_amount_cents integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.retail_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.retail_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.retail_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.retail_order_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS retail_packages_public_read ON public.retail_packages;
CREATE POLICY retail_packages_public_read
  ON public.retail_packages FOR SELECT
  USING (active = true);

DROP POLICY IF EXISTS retail_addons_public_read ON public.retail_addons;
CREATE POLICY retail_addons_public_read
  ON public.retail_addons FOR SELECT
  USING (active = true AND amount_cents IS NOT NULL);

DROP POLICY IF EXISTS retail_orders_admin_select ON public.retail_orders;
CREATE POLICY retail_orders_admin_select
  ON public.retail_orders FOR SELECT
  TO authenticated
  USING (private.is_admin());

DROP POLICY IF EXISTS retail_order_items_admin_select ON public.retail_order_items;
CREATE POLICY retail_order_items_admin_select
  ON public.retail_order_items FOR SELECT
  TO authenticated
  USING (private.is_admin());

GRANT SELECT ON public.retail_packages TO anon, authenticated;
GRANT SELECT ON public.retail_addons TO anon, authenticated;
GRANT SELECT ON public.retail_orders TO authenticated;
GRANT SELECT ON public.retail_order_items TO authenticated;

INSERT INTO public.retail_packages (slug, name, kind, amount_cents, visit_count, active, sort_order)
VALUES
  ('opening', 'Pool Opening', 'opening', 32500, 1, true, 10),
  ('closing', 'Pool Closing', 'closing', 32500, 1, true, 20),
  ('combo', 'Open + Close Combo', 'combo', 58500, 2, true, 30)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  kind = EXCLUDED.kind,
  amount_cents = EXCLUDED.amount_cents,
  visit_count = EXCLUDED.visit_count,
  active = EXCLUDED.active,
  sort_order = EXCLUDED.sort_order;

INSERT INTO public.retail_addons (slug, name, amount_cents, active, sort_order)
VALUES
  ('spa', 'Spa', NULL, true, 10),
  ('waterfall', 'Waterfall', NULL, false, 20)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  active = EXCLUDED.active,
  sort_order = EXCLUDED.sort_order;
-- amount_cents unused. Season prices: see sql/retail_addon_season_prices.sql

CREATE OR REPLACE FUNCTION public.start_retail_checkout(
  p_package_slug text,
  p_addon_slugs text[],
  p_customer_name text,
  p_customer_email text,
  p_customer_phone text,
  p_line1 text,
  p_city text,
  p_zip text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_pkg public.retail_packages;
  v_addon public.retail_addons;
  v_slug text;
  v_visits integer;
  v_discount integer := 0;
  v_amount integer := 0;
  v_order_id uuid;
  v_items jsonb := '[]'::jsonb;
BEGIN
  IF NULLIF(TRIM(COALESCE(p_package_slug, '')), '') IS NULL
     OR NULLIF(TRIM(COALESCE(p_customer_name, '')), '') IS NULL
     OR NULLIF(TRIM(COALESCE(p_customer_email, '')), '') IS NULL
     OR NULLIF(TRIM(COALESCE(p_customer_phone, '')), '') IS NULL
     OR NULLIF(TRIM(COALESCE(p_line1, '')), '') IS NULL
     OR NULLIF(TRIM(COALESCE(p_city, '')), '') IS NULL
     OR NULLIF(TRIM(COALESCE(p_zip, '')), '') IS NULL THEN
    RAISE EXCEPTION 'missing required checkout fields';
  END IF;

  SELECT * INTO v_pkg
  FROM public.retail_packages
  WHERE slug = TRIM(p_package_slug) AND active = true;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'package not found';
  END IF;

  v_visits := GREATEST(COALESCE(v_pkg.visit_count, 1), 1);

  -- Combo $540 is 10% off the $600 opening+closing base only. Do not discount add-ons.
  IF v_pkg.kind = 'combo' THEN
    v_discount := 6500;
  END IF;

  v_amount := v_pkg.amount_cents;

  INSERT INTO public.retail_orders (
    package_id, status, amount_cents, discount_cents,
    customer_name, customer_email, customer_phone,
    line1, city, zip, state
  ) VALUES (
    v_pkg.id, 'pending_payment', 0, v_discount,
    TRIM(p_customer_name), TRIM(p_customer_email), TRIM(p_customer_phone),
    TRIM(p_line1), TRIM(p_city), TRIM(p_zip), 'NJ'
  )
  RETURNING id INTO v_order_id;

  INSERT INTO public.retail_order_items (order_id, kind, sku, name, quantity, unit_amount_cents)
  VALUES (v_order_id, 'package', v_pkg.slug, v_pkg.name, 1, v_pkg.amount_cents);

  v_items := v_items || jsonb_build_array(jsonb_build_object(
    'sku', v_pkg.slug,
    'kind', 'package',
    'name', v_pkg.name,
    'quantity', 1,
    'unit_amount_cents', v_pkg.amount_cents
  ));

  IF p_addon_slugs IS NOT NULL THEN
    FOREACH v_slug IN ARRAY p_addon_slugs LOOP
      IF NULLIF(TRIM(v_slug), '') IS NULL THEN
        CONTINUE;
      END IF;

      SELECT * INTO v_addon
      FROM public.retail_addons
      WHERE slug = TRIM(v_slug) AND active = true;

      IF NOT FOUND THEN
        RAISE EXCEPTION 'add-on % is not priced yet', TRIM(v_slug);
      END IF;

      IF v_addon.amount_cents IS NULL THEN
        RAISE EXCEPTION 'add-on % is not priced yet', v_addon.slug;
      END IF;

      v_amount := v_amount + (v_addon.amount_cents * v_visits);

      INSERT INTO public.retail_order_items (order_id, kind, sku, name, quantity, unit_amount_cents)
      VALUES (v_order_id, 'addon', v_addon.slug, v_addon.name, v_visits, v_addon.amount_cents);

      v_items := v_items || jsonb_build_array(jsonb_build_object(
        'sku', v_addon.slug,
        'kind', 'addon',
        'name', v_addon.name,
        'quantity', v_visits,
        'unit_amount_cents', v_addon.amount_cents
      ));
    END LOOP;
  END IF;

  UPDATE public.retail_orders
  SET amount_cents = v_amount, updated_at = now()
  WHERE id = v_order_id;

  RETURN jsonb_build_object(
    'order_id', v_order_id,
    'amount_cents', v_amount,
    'discount_cents', v_discount,
    'package', jsonb_build_object(
      'slug', v_pkg.slug,
      'name', v_pkg.name,
      'kind', v_pkg.kind
    ),
    'items', v_items
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.attach_retail_stripe_session(
  p_order_id uuid,
  p_session_id text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_updated integer;
BEGIN
  IF p_order_id IS NULL OR NULLIF(TRIM(COALESCE(p_session_id, '')), '') IS NULL THEN
    RAISE EXCEPTION 'order not attachable';
  END IF;

  UPDATE public.retail_orders
  SET stripe_checkout_session_id = TRIM(p_session_id),
      updated_at = now()
  WHERE id = p_order_id
    AND status = 'pending_payment'
    AND stripe_checkout_session_id IS NULL;

  GET DIAGNOSTICS v_updated = ROW_COUNT;
  IF v_updated = 0 THEN
    RAISE EXCEPTION 'order not attachable';
  END IF;
END;
$function$;

CREATE OR REPLACE FUNCTION public.fulfill_retail_order_from_stripe(
  p_session_id text,
  p_payment_intent_id text,
  p_stripe_customer_id text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_order public.retail_orders;
  v_pkg public.retail_packages;
  v_contact_id uuid;
  v_location_id uuid;
  v_ticket_id uuid;
  v_service_id uuid;
  v_first text;
  v_last text;
  v_notes text;
BEGIN
  IF NULLIF(TRIM(COALESCE(p_session_id, '')), '') IS NULL THEN
    RAISE EXCEPTION 'order not found for session';
  END IF;

  SELECT * INTO v_order
  FROM public.retail_orders
  WHERE stripe_checkout_session_id = TRIM(p_session_id)
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'order not found for session';
  END IF;

  IF v_order.status = 'paid' AND v_order.ticket_id IS NOT NULL THEN
    RETURN jsonb_build_object(
      'order_id', v_order.id,
      'ticket_id', v_order.ticket_id,
      'status', 'paid',
      'idempotent', true
    );
  END IF;

  SELECT * INTO v_pkg FROM public.retail_packages WHERE id = v_order.package_id;

  v_first := NULLIF(TRIM(split_part(TRIM(v_order.customer_name), ' ', 1)), '');
  v_last := NULLIF(TRIM(substr(TRIM(v_order.customer_name), length(COALESCE(v_first, '')) + 1)), '');
  IF v_first IS NULL THEN
    v_first := 'Customer';
  END IF;

  INSERT INTO public.contacts (contact_type, first_name, last_name, email, phone)
  VALUES (
    'homeowner',
    v_first,
    v_last,
    v_order.customer_email,
    v_order.customer_phone
  )
  RETURNING id INTO v_contact_id;

  INSERT INTO public.locations (line1, city, state, zip, formatted_address)
  VALUES (
    v_order.line1,
    v_order.city,
    COALESCE(NULLIF(v_order.state, ''), 'NJ'),
    v_order.zip,
    TRIM(CONCAT_WS(', ', v_order.line1, v_order.city, COALESCE(NULLIF(v_order.state, ''), 'NJ'), v_order.zip))
  )
  RETURNING id INTO v_location_id;

  INSERT INTO public.contact_locations (contact_id, location_id, is_primary)
  VALUES (v_contact_id, v_location_id, true);

  SELECT id INTO v_service_id
  FROM public.services
  WHERE slug = 'openings-closings'
  LIMIT 1;

  v_notes := TRIM(CONCAT_WS(E'\n',
    'Stripe checkout session: ' || COALESCE(v_order.stripe_checkout_session_id, TRIM(p_session_id)),
    'Stripe payment intent: ' || COALESCE(NULLIF(TRIM(COALESCE(p_payment_intent_id, '')), ''), '(none)'),
    'Stripe customer: ' || COALESCE(NULLIF(TRIM(COALESCE(p_stripe_customer_id, '')), ''), '(none)'),
    'Retail order: ' || v_order.id::text
  ));

  INSERT INTO public.tickets (
    location_id,
    contact_id,
    service_id,
    service_note,
    description,
    status,
    accounting_notes
  ) VALUES (
    v_location_id,
    v_contact_id,
    v_service_id,
    COALESCE(v_pkg.name, 'Opening / closing'),
    TRIM(CONCAT_WS(E'\n',
      COALESCE(v_pkg.name, 'Opening / closing'),
      v_order.customer_name,
      TRIM(CONCAT_WS(', ', v_order.line1, v_order.city, v_order.zip))
    )),
    'requested',
    v_notes
  )
  RETURNING id INTO v_ticket_id;

  UPDATE public.retail_orders
  SET status = 'paid',
      stripe_payment_intent_id = NULLIF(TRIM(COALESCE(p_payment_intent_id, '')), ''),
      stripe_customer_id = NULLIF(TRIM(COALESCE(p_stripe_customer_id, '')), ''),
      ticket_id = v_ticket_id,
      paid_at = COALESCE(paid_at, now()),
      updated_at = now()
  WHERE id = v_order.id;

  RETURN jsonb_build_object(
    'order_id', v_order.id,
    'ticket_id', v_ticket_id,
    'status', 'paid',
    'idempotent', false
  );
END;
$function$;

GRANT EXECUTE ON FUNCTION public.start_retail_checkout(text, text[], text, text, text, text, text, text)
  TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.attach_retail_stripe_session(uuid, text)
  TO anon, authenticated, service_role;
REVOKE ALL ON FUNCTION public.fulfill_retail_order_from_stripe(text, text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.fulfill_retail_order_from_stripe(text, text, text) FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.fulfill_retail_order_from_stripe(text, text, text)
  TO service_role;
