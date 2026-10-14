import { NextResponse } from "next/server";

/** Branded short link for Saul Zafarani $1,500 invoice (Stripe hosted). */
const SAUL_INVOICE_URL =
  "https://invoice.stripe.com/i/acct_1JUJTHDr06uPhvcG/live_YWNjdF8xSlVKVEhEcjA2dVBodmNHLF9WQ2lTS0d6b2ZmQjBpMlpuWUszSnFWSlhoeEM4WE1PLDE3OTE1MzMzMQ0200HywBulnY?s=ap";

export function GET() {
  return NextResponse.redirect(SAUL_INVOICE_URL, 302);
}
