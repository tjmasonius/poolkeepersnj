import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";


export const metadata: Metadata = {
  title: `Sample quote (demo) | ${siteConfig.brandName}`,
  description:
    "Customer-facing SOW layout: line items, Included, Not included, totals, terms. Demo placeholders — Workiz is system of record.",
  robots: { index: false, follow: false },
};


const LINE_ITEMS = [
  {
    name: "Weekly Full Service visit",
    detail: "4 visits / mo est. · $[xx]/visit",
    ext: "$[xxx]",
  },
  {
    name: "Filter pressure & basket clean",
    detail: "Each visit",
    ext: "Incl.",
  },
  {
    name: "Water test & balance",
    detail: "Each visit",
    ext: "Incl.",
  },
];


const INCLUDED = [
  "On-site water testing + chemical adjustment",
  "Skim surface; empty skimmer/pump baskets",
  "Brush walls/steps as needed; vacuum as needed",
  "Visual equipment check; note issues",
  "Text/photo when owner decision needed",
];


const NOT_INCLUDED = [
  "Salt cell clean/replace · filter deep-clean",
  "Equipment repair or parts",
  "Green-to-clean · open/close",
  "Tile/calcium/stain treatment",
  "Missed-visit makeups outside route day",
];


export default function SampleQuotePage() {
  return (
    <div className="bg-[#eef0f3] pb-16">
      <div className="mx-auto max-w-lg bg-white shadow-soft md:my-8 md:rounded-3xl md:border md:border-pool-100 md:overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center gap-3 border-b border-pool-100 px-4 py-3">
          <Link
            href="/"
            className="text-sm font-semibold text-pool-800 hover:text-pool-600"
          >
            ← Home
          </Link>
          <strong className="text-sm text-pool-950">Quote</strong>
          <span className="ml-auto rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-[10px] font-bold text-teal-800">
            Workiz SOR
          </span>
        </div>


        {/* Demo banner */}
        <div className="border-b border-amber-200 bg-amber-50 px-4 py-2.5 text-center text-xs font-semibold text-amber-900">
          Demo sample — not a live Workiz quote. Placeholders use $[xx].
        </div>


        {/* Package header */}
        <div className="border-b border-pool-100 px-4 py-4">
          <p className="text-xs text-pool-900/55">
            Quote #Q-2026-0912 · Valid through Sep 19, 2026
          </p>
          <h1 className="mt-1 text-xl font-bold text-pool-950">
            Weekly Full Service
          </h1>
          <p className="mt-1 text-xs leading-relaxed text-pool-900/55">
            In-season · Job site on file
            <br />
            {siteConfig.brandName}
          </p>
        </div>


        {/* Line items */}
        <div className="border-b border-pool-100 px-4 py-4">
          <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.1em] text-pool-900/50">
            Line items
          </p>
          <ul>
            {LINE_ITEMS.map((row) => (
              <li
                key={row.name}
                className="flex justify-between gap-3 border-b border-dashed border-pool-100 py-2 text-sm last:border-0"
              >
                <div>
                  <div className="text-pool-950">{row.name}</div>
                  <div className="text-xs text-pool-900/55">{row.detail}</div>
                </div>
                <div className="shrink-0 font-bold tabular-nums text-pool-950">
                  {row.ext}
                </div>
              </li>
            ))}
          </ul>
        </div>


        {/* Included */}
        <div className="border-b border-pool-100 px-4 py-4">
          <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.1em] text-teal-700">
            Included
          </p>
          <ul className="list-disc space-y-1.5 pl-4 text-sm leading-snug text-pool-950">
            {INCLUDED.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>


        {/* Not included */}
        <div className="border-b border-pool-100 px-4 py-4">
          <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.1em] text-orange-800">
            Not included
          </p>
          <ul className="list-disc space-y-1.5 pl-4 text-sm leading-snug text-orange-950/80">
            {NOT_INCLUDED.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>


        {/* Totals */}
        <div className="border-b border-pool-100 bg-[#f8fafb] px-4 py-4">
          <div className="flex justify-between py-1.5 text-sm">
            <span>Subtotal</span>
            <span className="font-bold tabular-nums">$[xxx]</span>
          </div>
          <div className="flex justify-between py-1.5 text-sm">
            <span>Tax (if any)</span>
            <span className="font-bold tabular-nums">$[xx]</span>
          </div>
          <div className="flex justify-between py-1.5 text-base font-extrabold">
            <span>Total</span>
            <span className="tabular-nums">$[xxx]</span>
          </div>
        </div>


        {/* Terms */}
        <div className="border-b border-pool-100 px-4 py-4">
          <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.1em] text-pool-900/50">
            Terms
          </p>
          <p className="text-[11px] leading-relaxed text-pool-900/60">
            Service on scheduled route day; weather/access may shift timing.
            Chemicals included vs billed as stated on this quote. Provide
            gate/pet notes. Scope = listed items only; add-ons need approval
            before work.
          </p>
        </div>


        {/* Workiz note */}
        <div className="mx-4 mt-4 rounded-[10px] border border-orange-200 bg-orange-50 px-3 py-2.5 text-[11px] leading-relaxed text-orange-900">
          Sites present this layout. Workiz remains system of record — same
          sections, no second SOW shape.
        </div>


        {/* Actions */}
        <div className="grid gap-2 px-4 py-5">
          <Link href="/contact" className="btn-primary w-full py-3.5">
            Approve &amp; schedule
          </Link>
          <a
            href={`mailto:${siteConfig.email}?subject=Question%20about%20quote%20Q-2026-0912`}
            className="btn-dark w-full py-3.5"
          >
            Ask a question
          </a>
          <a
            href={siteConfig.phoneHref}
            className="inline-flex w-full items-center justify-center rounded-full border border-pool-100 bg-white py-3.5 text-sm font-extrabold text-pool-950"
          >
            Call
          </a>
        </div>
      </div>
    </div>
  );
}
