import Stripe from "stripe";

const API_VERSION = "2026-08-26.dahlia" as const;

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(key, { apiVersion: API_VERSION });
}
