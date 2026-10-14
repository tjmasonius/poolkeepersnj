import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { siteConfig } from "@/lib/site-config";
import { formatUsdFromCents } from "@/lib/format";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Packages | ${siteConfig.brandName}`,
};

export const revalidate = 60;

type PackageRow = {
  slug: string;
  name: string;
  kind: string;
  amount_cents: number;
  visit_count: number;
};

const COPY: Record<string, { blurb: string; cta: string }> = {
  opening: {
    blurb:
      "Spring opening — we remove the cover, start up equipment, and get the water ready for the season. Price includes heater cleaning. Spa is extra ($60).",
    cta: "Book opening",
  },
  closing: {
    blurb:
      "Fall closing — we winterize the pool and equipment so it sits safely until spring. Price includes heater and waterfall. Spa is extra ($80).",
    cta: "Book closing",
  },
  combo: {
    blurb:
      "Book opening and closing together and save 10% on the $650 package base. Heater and waterfall are included. Spa stays full price and is billed per season ($60 open + $80 close).",
    cta: "Book open + close",
  },
};

export default async function PackagesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("retail_packages")
    .select("slug, name, kind, amount_cents, visit_count")
    .eq("active", true)
    .order("sort_order");
  const packages = (data ?? []) as PackageRow[];

  return (
    <>
      <section className="bg-pool-950 py-20">
        <div className="container-page">
          <p className="section-eyebrow text-pool-300">Packages</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold text-white md:text-5xl">
            Opening and closing, priced up front
          </h1>
          <p className="mt-4 max-w-xl text-pool-100/80">
            Pay online. After payment, the office puts your visit on the
            schedule. Opening includes heater cleaning. Closing includes
            heater and waterfall. Spa is extra — $60 at opening, $80 at
            closing.
          </p>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {packages.map((pkg) => {
            const copy = COPY[pkg.slug] ?? {
              blurb: pkg.name,
              cta: "Book this package",
            };
            const isCombo = pkg.kind === "combo" || pkg.slug === "combo";
            return (
              <div
                key={pkg.slug}
                className="flex flex-col rounded-3xl border border-pool-100 bg-white p-8 shadow-sm"
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-pool-400">
                  {pkg.name}
                </p>
                <p className="mt-4 text-4xl font-bold text-pool-950">
                  {formatUsdFromCents(pkg.amount_cents)}
                </p>
                {isCombo && (
                  <p className="mt-1 text-sm font-medium text-emerald-700">
                    10% off the $650 opening + closing base
                  </p>
                )}
                <p className="mt-4 flex-1 text-sm leading-relaxed text-pool-900/70">
                  {copy.blurb}
                </p>
                <Link
                  href={`/checkout?package=${pkg.slug}`}
                  className="btn-primary mt-6 w-full"
                >
                  {copy.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>

        <p className="mt-10 max-w-2xl text-sm text-pool-900/65">
          Combo is 10% off the $650 opening + closing base ($585). Heater
          and waterfall are included in the package price. Spa stays full
          price and is billed per season ($60 opening / $80 closing).
        </p>
        <p className="mt-4 text-xs text-pool-900/55">
          NJ HIC License #{siteConfig.hicLicense}. {siteConfig.njContractorNotice}
        </p>
      </section>
    </>
  );
}
