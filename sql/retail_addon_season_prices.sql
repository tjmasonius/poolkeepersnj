-- Current public add-on prices. Pricing truth is opening_amount_cents / closing_amount_cents.
-- Spa only: opening $60 / closing $80. Waterfall is included in the closing/combo package
-- base (not a checkout add-on): unpriced and inactive.
-- Packages: Opening $325 / Closing $325 / Combo $585 (10% off $650 base, $65).
-- See also sql/retail_packages_heater_waterfall_included.sql (live overwrite).
-- First migration retail_addon_season_prices seeded spa+waterfall add-ons; that was overwritten.

ALTER TABLE public.retail_addons
  ADD COLUMN IF NOT EXISTS opening_amount_cents integer,
  ADD COLUMN IF NOT EXISTS closing_amount_cents integer;

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
