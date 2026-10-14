-- Public retail formula (TJ, 2026-08-31): heater + waterfall in the base.
-- Opening $325 (includes heater cleaning). Closing $325 (includes heater + waterfall).
-- Combo $585 = 10% off the $650 base only ($65 / 6500 cents). Do not discount spa.
-- Public add-on is spa only: opening $60 / closing $80. Combo spa billed as two season items.
-- Waterfall is NOT a checkout add-on (unpriced, inactive). Included in closing/combo base.
-- Do not invent an opening waterfall SKU. Do not put week/grotto/filter/cover/chemical SKUs on checkout.
-- Applied on project emgnkmidponhmccmrrwc as migration retail_packages_heater_waterfall_included.

UPDATE public.retail_packages
SET amount_cents = 32500, visit_count = 1, active = true, name = 'Pool Opening', kind = 'opening'
WHERE slug = 'opening';

UPDATE public.retail_packages
SET amount_cents = 32500, visit_count = 1, active = true, name = 'Pool Closing', kind = 'closing'
WHERE slug = 'closing';

UPDATE public.retail_packages
SET amount_cents = 58500, visit_count = 2, active = true, name = 'Open + Close Combo', kind = 'combo'
WHERE slug = 'combo';

UPDATE public.retail_addons
SET
  opening_amount_cents = 6000,
  closing_amount_cents = 8000,
  amount_cents = NULL,
  active = true
WHERE slug = 'spa';

UPDATE public.retail_addons
SET
  opening_amount_cents = NULL,
  closing_amount_cents = NULL,
  amount_cents = NULL,
  active = false
WHERE slug = 'waterfall';

DROP POLICY IF EXISTS retail_addons_public_read ON public.retail_addons;
CREATE POLICY retail_addons_public_read
  ON public.retail_addons FOR SELECT
  USING (
    active = true
    AND (
      opening_amount_cents IS NOT NULL
      OR closing_amount_cents IS NOT NULL
    )
  );

GRANT SELECT ON public.retail_addons TO anon, authenticated;

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
  v_order_id uuid;
  v_amount integer := 0;
  v_discount integer := 0;
  v_slug text;
  v_items jsonb := '[]'::jsonb;
BEGIN
  IF COALESCE(TRIM(p_package_slug), '') = '' THEN
    RAISE EXCEPTION 'package required';
  END IF;
  IF COALESCE(TRIM(p_customer_name), '') = '' THEN
    RAISE EXCEPTION 'name required';
  END IF;
  IF COALESCE(TRIM(p_customer_email), '') = '' OR POSITION('@' IN p_customer_email) = 0 THEN
    RAISE EXCEPTION 'email required';
  END IF;

  SELECT * INTO v_pkg
  FROM public.retail_packages
  WHERE slug = TRIM(p_package_slug) AND active
  LIMIT 1;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'unknown package';
  END IF;

  -- Combo $585 is 10% off the $650 opening+closing base only ($65). Do not discount add-ons.
  v_discount := CASE WHEN v_pkg.kind = 'combo' THEN 6500 ELSE 0 END;
  v_amount := v_pkg.amount_cents;

  INSERT INTO public.retail_orders (
    package_id, customer_name, customer_email, customer_phone,
    line1, city, state, zip, amount_cents, discount_cents, status
  ) VALUES (
    v_pkg.id, TRIM(p_customer_name), LOWER(TRIM(p_customer_email)), NULLIF(TRIM(p_customer_phone), ''),
    NULLIF(TRIM(p_line1), ''), NULLIF(TRIM(p_city), ''), 'NJ', NULLIF(TRIM(p_zip), ''),
    v_pkg.amount_cents, v_discount, 'pending_payment'
  ) RETURNING id INTO v_order_id;

  INSERT INTO public.retail_order_items (order_id, kind, sku, name, quantity, unit_amount_cents)
  VALUES (v_order_id, 'package', v_pkg.slug, v_pkg.name, 1, v_pkg.amount_cents);

  v_items := v_items || jsonb_build_array(jsonb_build_object(
    'kind', 'package',
    'sku', v_pkg.slug,
    'name', v_pkg.name,
    'quantity', 1,
    'unit_amount_cents', v_pkg.amount_cents
  ));

  IF p_addon_slugs IS NOT NULL THEN
    FOREACH v_slug IN ARRAY p_addon_slugs LOOP
      IF COALESCE(TRIM(v_slug), '') = '' THEN
        CONTINUE;
      END IF;

      SELECT * INTO v_addon
      FROM public.retail_addons
      WHERE slug = TRIM(v_slug) AND active
      LIMIT 1;

      IF NOT FOUND THEN
        RAISE EXCEPTION 'unknown add-on %', TRIM(v_slug);
      END IF;

      -- Opening season: charge opening_amount_cents if priced; skip if NULL. Never multiply by visit_count.
      IF v_pkg.kind IN ('opening', 'combo') AND v_addon.opening_amount_cents IS NOT NULL THEN
        v_amount := v_amount + v_addon.opening_amount_cents;
        INSERT INTO public.retail_order_items (order_id, kind, sku, name, quantity, unit_amount_cents)
        VALUES (
          v_order_id,
          'addon',
          v_addon.slug || '-opening',
          v_addon.name || ' (opening)',
          1,
          v_addon.opening_amount_cents
        );
        v_items := v_items || jsonb_build_array(jsonb_build_object(
          'kind', 'addon',
          'sku', v_addon.slug || '-opening',
          'name', v_addon.name || ' (opening)',
          'quantity', 1,
          'unit_amount_cents', v_addon.opening_amount_cents
        ));
      END IF;

      -- Closing season: charge closing_amount_cents if priced; skip if NULL.
      IF v_pkg.kind IN ('closing', 'combo') AND v_addon.closing_amount_cents IS NOT NULL THEN
        v_amount := v_amount + v_addon.closing_amount_cents;
        INSERT INTO public.retail_order_items (order_id, kind, sku, name, quantity, unit_amount_cents)
        VALUES (
          v_order_id,
          'addon',
          v_addon.slug || '-closing',
          v_addon.name || ' (closing)',
          1,
          v_addon.closing_amount_cents
        );
        v_items := v_items || jsonb_build_array(jsonb_build_object(
          'kind', 'addon',
          'sku', v_addon.slug || '-closing',
          'name', v_addon.name || ' (closing)',
          'quantity', 1,
          'unit_amount_cents', v_addon.closing_amount_cents
        ));
      END IF;
    END LOOP;
  END IF;

  UPDATE public.retail_orders
  SET amount_cents = v_amount, updated_at = now()
  WHERE id = v_order_id;

  RETURN jsonb_build_object(
    'order_id', v_order_id,
    'amount_cents', v_amount,
    'discount_cents', v_discount,
    'package', jsonb_build_object('slug', v_pkg.slug, 'name', v_pkg.name, 'kind', v_pkg.kind),
    'items', v_items
  );
END;
$function$;

GRANT EXECUTE ON FUNCTION public.start_retail_checkout(text, text[], text, text, text, text, text, text)
  TO anon, authenticated, service_role;
