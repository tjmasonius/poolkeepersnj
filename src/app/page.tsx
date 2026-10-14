import Link from "next/link";
import { ArrowRight, ShieldCheck, Star } from "lucide-react";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { siteConfig } from "@/lib/site-config";


export const revalidate = 300;


const TRUST = [
  {
    title: `NJ HIC #${siteConfig.hicLicense}`,
    body: "Active license",
  },
  {
    title: "Fully insured",
    body: "For your property",
  },
  {
    title: "Google reviews",
    body: "Score + count → GBP",
    href: "https://www.google.com/maps/search/?api=1&query=Pool+Keepers+NJ+Whiting",
  },
  {
    title: "Local NJ",
    body: "Whiting HQ",
  },
];


const PACKAGES = [
  {
    name: "Weekly Full Service",
    blurb: "Chemicals, skim, brush, vacuum as needed",
    note: "Includes list on quote · mirrors Workiz",
  },
  {
    name: "Filter & equipment check",
    blurb: "Add-on or stand-alone ticket",
    note: "Never buried in “full service”",
  },
];


const STEPS = [
  "Tell us address + package need",
  "Get SOW quote (Included / Not included)",
  "Approve → on the route",
];


export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-pool-gradient">
        <div className="absolute inset-0 bg-wave-pattern" />
        <div className="container-page relative py-16 md:py-24">
          <div className="relative max-w-2xl">
            {/* Optional duck placeholder — dashed circle, non-blocking */}
            <div
              className="absolute -right-2 top-0 hidden h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-white/45 bg-pool-500/25 text-center text-[10px] leading-tight text-pool-100 sm:flex md:right-0 md:h-[72px] md:w-[72px] md:text-[11px]"
              aria-hidden="true"
            >
              duck
              <br />
              hero
            </div>
            <p className="section-eyebrow text-pool-400">{siteConfig.serviceArea}</p>
            <h1 className="mt-3 max-w-xl text-4xl font-extrabold leading-[1.12] tracking-tight text-white md:text-5xl lg:text-6xl">
              Your pool, kept.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/90 md:text-lg">
              Route-based weekly care with clear scope — what’s in, what’s not.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Get a quote <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={siteConfig.phoneHref} className="btn-dark border border-white/15">
                Call {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* TRUST STRIP — above fold on mobile */}
      <section className="border-b border-pool-100 bg-[#f8fafb]">
        <div className="container-page grid grid-cols-2 gap-2 py-3 sm:gap-3 md:grid-cols-4 md:py-4">
          {TRUST.map((item) => {
            const inner = (
              <>
                <strong className="block text-xs font-bold text-pool-950 md:text-sm">
                  {item.title}
                </strong>
                <span className="mt-0.5 block text-[11px] leading-snug text-pool-900/65 md:text-xs">
                  {item.body}
                </span>
              </>
            );
            const className =
              "rounded-[10px] border border-pool-100 bg-white px-2.5 py-2 md:px-3 md:py-2.5";
            if ("href" in item && item.href) {
              return (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${className} transition hover:border-pool-400`}
                >
                  <span className="mb-0.5 inline-flex items-center gap-1 text-pool-500">
                    <Star className="h-3 w-3" aria-hidden />
                  </span>
                  {inner}
                </a>
              );
            }
            return (
              <div key={item.title} className={className}>
                {item.title.startsWith("NJ HIC") || item.title === "Fully insured" ? (
                  <ShieldCheck className="mb-0.5 h-3.5 w-3.5 text-pool-600" aria-hidden />
                ) : null}
                {inner}
              </div>
            );
          })}
        </div>
      </section>


      {/* PACKAGES TEASER */}
      <section className="container-page py-12 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="section-eyebrow">Packages</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-pool-950 md:text-3xl">
              Clear scope, quoted the way we work
            </h2>
          </div>
          <Link
            href="/quote/sample"
            className="text-sm font-semibold text-pool-600 hover:text-pool-800"
          >
            See sample SOW quote →
          </Link>
        </div>
        <p className="mt-3 max-w-2xl text-sm text-pool-900/70">
          Quotes show <strong>Included</strong> / <strong>Not included</strong>{" "}
          — same structure as Workiz (system of record).
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className="rounded-[14px] border border-pool-100 bg-white p-4 md:p-5"
            >
              <strong className="block text-sm font-bold text-pool-950 md:text-base">
                {pkg.name}
              </strong>
              <span className="mt-1 block text-xs text-pool-900/60 md:text-sm">
                {pkg.blurb}
              </span>
              <em className="mt-2 block text-xs font-semibold not-italic text-pool-800 md:text-sm">
                {pkg.note}
              </em>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/packages" className="btn-secondary">
            Opening &amp; closing packages <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>


      {/* HOW IT WORKS */}
      <section className="bg-pool-50/70 py-12 md:py-16">
        <div className="container-page">
          <p className="section-eyebrow">How it works</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-pool-950 md:text-3xl">
            Three steps to clear water
          </h2>
          <ol className="mt-8 grid gap-3 md:grid-cols-3 md:gap-6">
            {STEPS.map((label, i) => (
              <li key={label} className="flex items-start gap-3 text-sm text-pool-900">
                <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-pool-800 text-[11px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="pt-0.5 leading-snug">{label}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>


      {/* BOTTOM CTA */}
      <section className="container-page py-12 pb-28 md:py-16 md:pb-16">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-pool-950 px-6 py-10 text-center md:flex-row md:px-10 md:text-left">
          <div>
            <div className="flex items-center justify-center gap-2 text-pool-400 md:justify-start">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">
                Licensed &amp; insured · NJ HIC #{siteConfig.hicLicense}
              </span>
            </div>
            <h2 className="mt-3 max-w-lg text-2xl font-bold text-white md:text-3xl">
              Ready for a pool company that shows up?
            </h2>
          </div>
          <div className="flex shrink-0 flex-wrap justify-center gap-3">
            <a href={siteConfig.phoneHref} className="btn-dark border border-white/10">
              Call
            </a>
            <Link href="/contact" className="btn-primary">
              Get a quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>


      <StickyMobileCTA />
    </>
  );
}
