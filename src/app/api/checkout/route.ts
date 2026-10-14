import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";
import { siteConfig } from "@/lib/site-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CheckoutItem = {
  sku: string;
  kind: string;
  name: string;
  quantity: number;
  unit_amount_cents: number;
};

type StartCheckoutResult = {
  order_id: string;
  amount_cents: number;
  discount_cents: number;
  package: { slug: string; name: string; kind: string };
  items: CheckoutItem[];
};

function checkoutOrigin() {
  return `https://${siteConfig.domain}`;
}

export async function POST(request: Request) {
  let body: {
    package_slug?: unknown;
    addon_slugs?: unknown;
    customer_name?: unknown;
    email?: unknown;
    phone?: unknown;
    line1?: unknown;
    city?: unknown;
    zip?: unknown;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const package_slug = String(body.package_slug || "").trim();
  const customer_name = String(body.customer_name || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  const line1 = String(body.line1 || "").trim();
  const city = String(body.city || "").trim();
  const zip = String(body.zip || "").trim();
  const addon_slugs = Array.isArray(body.addon_slugs)
    ? body.addon_slugs.map((s) => String(s).trim()).filter(Boolean)
    : [];

  if (!package_slug || !customer_name || !email || !phone || !line1 || !city || !zip) {
    return NextResponse.json(
      { error: "Name, email, phone, street, city, zip, and a package are required." },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("start_retail_checkout", {
    p_package_slug: package_slug,
    p_addon_slugs: addon_slugs,
    p_customer_name: customer_name,
    p_customer_email: email,
    p_customer_phone: phone,
    p_line1: line1,
    p_city: city,
    p_zip: zip,
  });

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message || "Could not start checkout" },
      { status: 400 }
    );
  }

  const started = data as StartCheckoutResult;
  if (!started.order_id || !Array.isArray(started.items) || started.items.length === 0) {
    return NextResponse.json(
      { error: "Checkout could not be created" },
      { status: 500 }
    );
  }

  let stripe;
  try {
    stripe = getStripe();
  } catch {
    return NextResponse.json(
      { error: "Payments are not configured yet." },
      { status: 503 }
    );
  }

  const origin = checkoutOrigin();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email,
    line_items: started.items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        unit_amount: item.unit_amount_cents,
        product_data: { name: item.name },
      },
    })),
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout?canceled=1`,
    metadata: {
      order_id: started.order_id,
      customer_email: email,
    },
    client_reference_id: started.order_id,
  });

  if (!session.id || !session.url) {
    return NextResponse.json(
      { error: "Stripe did not return a checkout URL" },
      { status: 502 }
    );
  }

  const { error: attachError } = await supabase.rpc(
    "attach_retail_stripe_session",
    {
      p_order_id: started.order_id,
      p_session_id: session.id,
    }
  );

  if (attachError) {
    return NextResponse.json(
      { error: attachError.message || "Could not attach payment session" },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: session.url });
}
