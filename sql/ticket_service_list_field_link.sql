-- Office service list: Contacted status + schedule-to-Field RPC.
-- Field stop link lives on subc_jobs.website_ticket_id (see keepers-field/sql/website_ticket_link.sql).

ALTER TYPE public.ticket_status ADD VALUE IF NOT EXISTS 'contacted' AFTER 'requested';

DROP VIEW IF EXISTS public.ticket_overview;

CREATE VIEW public.ticket_overview AS
 SELECT t.id,
    t.ticket_number,
    t.lead_id,
    t.service_id,
    t.service_note,
    t.description,
    t.status,
    t.scheduled_date,
    t.completed_date,
    t.access_code,
    t.internal_notes,
    t.created_at,
    t.updated_at,
    t.location_id,
    t.contact_id,
    t.technician_notes,
    t.accounting_notes,
    l.formatted_address AS location_formatted_address,
    l.line1 AS location_line1,
    l.city AS location_city,
    pc.id AS primary_contact_id,
    pc.first_name AS primary_contact_first_name,
    pc.last_name AS primary_contact_last_name,
    pc.phone AS primary_contact_phone,
    pc.email AS primary_contact_email,
    bc.first_name AS billing_contact_first_name,
    bc.last_name AS billing_contact_last_name,
    bc.company_name AS billing_contact_company,
    l.state AS location_state,
    l.zip AS location_zip,
    fj.id AS field_job_id,
    fj.job_status AS field_job_status,
    fj.scheduled_date AS field_job_date
   FROM tickets t
     LEFT JOIN locations l ON l.id = t.location_id
     LEFT JOIN LATERAL (
       SELECT c.id, c.first_name, c.last_name, c.email, c.phone
       FROM contact_locations cl
       JOIN contacts c ON c.id = cl.contact_id
       WHERE cl.location_id = t.location_id AND cl.is_primary
       LIMIT 1
     ) pc ON true
     LEFT JOIN contacts bc ON bc.id = t.contact_id
     LEFT JOIN LATERAL (
       SELECT j.id, j.job_status, j.scheduled_date
       FROM subc_jobs j
       WHERE j.website_ticket_id = t.id
         AND j.active = true
         AND j.job_status IS DISTINCT FROM 'Completed'
       ORDER BY j.updated_at DESC
       LIMIT 1
     ) fj ON true;

ALTER VIEW public.ticket_overview SET (security_invoker = true);
GRANT SELECT ON public.ticket_overview TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.schedule_website_ticket(
  p_ticket_id uuid,
  p_date date,
  p_route_order integer DEFAULT NULL,
  p_technician_email text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_ticket public.tickets;
  v_loc public.locations;
  v_first text;
  v_last text;
  v_customer text;
  v_town text;
  v_address text;
  v_company_id uuid;
  v_open public.subc_jobs;
  v_job_id uuid;
  v_created boolean := false;
  v_tech text;
  v_pre text;
BEGIN
  IF NOT private.is_admin() THEN
    RAISE EXCEPTION 'not authorized';
  END IF;

  IF p_date IS NULL THEN
    RAISE EXCEPTION 'Pick a date to put this on the route.';
  END IF;

  SELECT * INTO v_ticket FROM public.tickets WHERE id = p_ticket_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'ticket not found';
  END IF;

  IF v_ticket.location_id IS NOT NULL THEN
    SELECT * INTO v_loc FROM public.locations WHERE id = v_ticket.location_id;
  END IF;

  IF NULLIF(TRIM(COALESCE(v_loc.formatted_address, '')), '') IS NULL
     AND NULLIF(TRIM(COALESCE(v_loc.line1, '')), '') IS NULL THEN
    RAISE EXCEPTION 'Add a street address before putting this on the route.';
  END IF;

  IF NULLIF(TRIM(COALESCE(v_loc.formatted_address, '')), '') IS NOT NULL THEN
    v_address := TRIM(v_loc.formatted_address);
  ELSE
    v_address := TRIM(CONCAT_WS(', ',
      NULLIF(TRIM(COALESCE(v_loc.line1, '')), ''),
      NULLIF(TRIM(COALESCE(v_loc.city, '')), ''),
      NULLIF(TRIM(COALESCE(v_loc.state, '')), ''),
      NULLIF(TRIM(COALESCE(v_loc.zip, '')), '')
    ));
  END IF;

  v_town := NULLIF(TRIM(COALESCE(v_loc.city, '')), '');

  IF v_ticket.contact_id IS NOT NULL THEN
    SELECT c.first_name, c.last_name
      INTO v_first, v_last
    FROM public.contacts c
    WHERE c.id = v_ticket.contact_id;
  END IF;

  IF v_first IS NULL AND v_last IS NULL AND v_ticket.location_id IS NOT NULL THEN
    SELECT c.first_name, c.last_name
      INTO v_first, v_last
    FROM public.contact_locations cl
    JOIN public.contacts c ON c.id = cl.contact_id
    WHERE cl.location_id = v_ticket.location_id AND cl.is_primary
    LIMIT 1;
  END IF;

  v_customer := NULLIF(TRIM(COALESCE(v_last, '')), '');
  IF v_customer IS NULL THEN
    v_customer := NULLIF(TRIM(COALESCE(v_first, '')), '');
  END IF;
  IF v_customer IS NULL THEN
    v_customer := v_ticket.ticket_number;
  END IF;

  v_tech := NULLIF(TRIM(COALESCE(p_technician_email, '')), '');

  v_pre := NULLIF(TRIM(CONCAT_WS(E'\n',
    'Website ' || v_ticket.ticket_number,
    NULLIF(TRIM(COALESCE(v_ticket.service_note, '')), ''),
    NULLIF(TRIM(COALESCE(v_ticket.description, '')), '')
  )), '');

  SELECT *
    INTO v_open
  FROM public.subc_jobs
  WHERE website_ticket_id = p_ticket_id
    AND active = true
    AND job_status IS DISTINCT FROM 'Completed'
  ORDER BY updated_at DESC
  LIMIT 1;

  IF v_open.id IS NOT NULL THEN
    v_company_id := v_open.company_id;
  END IF;

  IF v_company_id IS NULL THEN
    SELECT id INTO v_company_id
    FROM public.subc_companies
    WHERE lower(name) = 'pool keepers'
    LIMIT 1;
  END IF;

  IF v_company_id IS NULL THEN
    INSERT INTO public.subc_companies (name, notes, active)
    VALUES ('Pool Keepers', 'Pool Keepers NJ retail / TJ own customers (blue-font)', true)
    RETURNING id INTO v_company_id;
  END IF;

  IF v_open.id IS NOT NULL THEN
    UPDATE public.subc_jobs SET
      customer_last_name = v_customer,
      town = COALESCE(v_town, town),
      address = v_address,
      company_id = COALESCE(company_id, v_company_id),
      scheduled_date = p_date,
      route_order = COALESCE(p_route_order, route_order),
      technician_email = COALESCE(v_tech, technician_email),
      pre_notes = COALESCE(NULLIF(TRIM(COALESCE(pre_notes, '')), ''), v_pre),
      job_status = CASE
        WHEN job_status = 'In progress' THEN job_status
        ELSE 'Scheduled'
      END,
      updated_at = now()
    WHERE id = v_open.id;
    v_job_id := v_open.id;
  ELSE
    INSERT INTO public.subc_jobs (
      customer_last_name,
      town,
      address,
      company_id,
      scheduled_date,
      route_order,
      technician_email,
      pre_notes,
      job_status,
      website_ticket_id,
      active
    ) VALUES (
      v_customer,
      v_town,
      v_address,
      v_company_id,
      p_date,
      p_route_order,
      v_tech,
      v_pre,
      'Scheduled',
      p_ticket_id,
      true
    )
    RETURNING id INTO v_job_id;
    v_created := true;
  END IF;

  UPDATE public.tickets SET
    status = 'scheduled',
    scheduled_date = p_date,
    updated_at = now()
  WHERE id = p_ticket_id;

  RETURN jsonb_build_object(
    'job_id', v_job_id,
    'created', v_created,
    'scheduled_date', p_date
  );
END;
$function$;

REVOKE ALL ON FUNCTION public.schedule_website_ticket(uuid, date, integer, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.schedule_website_ticket(uuid, date, integer, text) TO authenticated, service_role;
