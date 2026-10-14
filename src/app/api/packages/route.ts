import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = await createClient();

  const [packagesRes, addonsRes] = await Promise.all([
    supabase
      .from("retail_packages")
      .select("id, slug, name, kind, amount_cents, visit_count, sort_order")
      .eq("active", true)
      .order("sort_order"),
    supabase
      .from("retail_addons")
      .select(
        "id, slug, name, opening_amount_cents, closing_amount_cents, sort_order"
      )
      .eq("active", true)
      .order("sort_order"),
  ]);

  if (packagesRes.error) {
    return NextResponse.json(
      { error: "Could not load packages" },
      { status: 500 }
    );
  }

  const addons = (addonsRes.data ?? []).filter(
    (a: {
      slug: string;
      opening_amount_cents: number | null;
      closing_amount_cents: number | null;
    }) =>
      a.slug !== "waterfall" &&
      (a.opening_amount_cents != null || a.closing_amount_cents != null)
  );

  return NextResponse.json({
    packages: packagesRes.data ?? [],
    addons,
  });
}
