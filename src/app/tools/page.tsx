import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { BookCta } from "@/components/BookCta";
import { CallUsSticky, CallUsTopBar } from "@/components/CallUs";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/guides/FaqList";
import { CALCULATOR_LINKS } from "@/lib/guide-types";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";

const title = "Pool Calculators | Pool Keepers NJ";
const description =
  "Free pool volume, salt, and chlorine calculators for New Jersey homeowners. See the formulas, then book Pool Keepers to test and treat the water.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/tools",
});

const faqs = [
  {
    q: "Do these calculators replace a water test?",
    a: "No. They turn a test result and a volume into a dose. You still need a current free-chlorine, salt, or CYA reading from a kit or a meter.",
  },
  {
    q: "Can I carry gallons from one calculator to the next?",
    a: "Yes. The volume calculator links into salt and chlorine with the gallon count in the address, and it also remembers that volume in the browser tab.",
  },
  {
    q: "Will Pool Keepers use the same numbers?",
    a: "We test on site and dose from that test. The calculators are the same industry math we expect a careful homeowner to use between visits.",
  },
];

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Calculators", path: "/tools" },
];

export default function ToolsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Tools"
        title="Pool calculators"
        lede="Volume, salt, and chlorine, with the formula on the page. Built for residential pools in Monmouth, Ocean, Middlesex, and Mercer Counties."
      />
      <CallUsTopBar />
      <div className="container-page pt-14 pb-28 md:pb-14">
        <div className="grid gap-5 md:grid-cols-3">
          {Object.values(CALCULATOR_LINKS).map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="flex flex-col rounded-3xl border border-pool-100 p-6 hover:border-pool-400"
            >
              <h2 className="text-xl font-bold text-pool-950">{tool.label}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-pool-900/75">{tool.text}</p>
              <span className="mt-5 text-sm font-semibold text-pool-700">Open calculator</span>
            </Link>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-pool-900/75">
          Doses assume you already know the pool&apos;s gallons. If you do not, start with volume.
          The guides explain what the targets mean, including{" "}
          <Link href="/learn/cya-stabilizer" className="font-semibold text-pool-800 underline decoration-pool-300">
            stabilizer
          </Link>{" "}
          and{" "}
          <Link href="/learn/saltwater-pool-care" className="font-semibold text-pool-800 underline decoration-pool-300">
            saltwater care
          </Link>
          .
        </p>
        <FaqList items={faqs} />
        <BookCta />
      </div>
      <CallUsSticky />
    </>
  );
}
