import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { BookCta } from "@/components/BookCta";
import { CallUsSticky, CallUsTopBar } from "@/components/CallUs";
import { Disclaimer } from "@/components/Disclaimer";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/guides/FaqList";
import { CalculatorFallback } from "@/components/tools/CalculatorFallback";
import { PoolVolumeCalculator } from "@/components/tools/PoolVolumeCalculator";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { GALLONS_PER_CUBIC_FOOT, KIDNEY_FILL_FACTOR, LITERS_PER_US_GALLON } from "@/lib/pool-math";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, howToJsonLd, webAppJsonLd } from "@/lib/seo";

const path = "/tools/pool-volume";
const title = "Pool Volume Calculator | Pool Keepers NJ";
const description =
  "Calculate pool gallons and liters for rectangle, round, oval, and kidney shapes. Feet and inches, one depth or shallow and deep, with the formula shown.";

export const metadata: Metadata = buildMetadata({ title, description, path });

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Calculators", path: "/tools" },
  { name: "Pool volume", path },
];

const steps = [
  {
    name: "Measure length and width",
    text: "Measure the water surface in feet and inches. For a round pool, measure the diameter. For a kidney, use the longest length and the widest width.",
  },
  {
    name: "Measure depth",
    text: "Use one water depth when the bottom is flat. When there is a shallow end and a deep end, measure both. The calculator averages them, which assumes a straight slope.",
  },
  {
    name: "Pick the shape",
    text: "Rectangle uses length × width × average depth. Round and oval use the ellipse or circle formula. Kidney uses 85% of the surrounding rectangle.",
  },
];

const faqs = [
  {
    q: "How do you turn cubic feet into gallons?",
    a: "One cubic foot is 1,728 cubic inches and one US gallon is 231 cubic inches, so a cubic foot holds 1,728 ÷ 231, or about 7.4805 gallons. Liters are gallons × 3.785411784.",
  },
  {
    q: "Does a shallow end and a deep end need a special formula?",
    a: "For a straight slope, average depth is (shallow + deep) ÷ 2. A hopper or a safety ledge that is not a straight slope will be a little off. The result is still the right starting point for dosing.",
  },
  {
    q: "How accurate is the kidney estimate?",
    a: "A kidney outline usually fills about 85% of the rectangle around it. Real shells vary. Treat the number as a planning estimate, and confirm with a meter if you are making a large chemical change.",
  },
];

export default function PoolVolumePage() {
  return (
    <>
      <JsonLd data={webAppJsonLd({ name: "Pool volume calculator", description, path })} />
      <JsonLd
        data={howToJsonLd({
          name: "How to measure pool volume",
          description: "Measure the pool, choose the shape, and convert cubic feet to US gallons.",
          path,
          steps,
        })}
      />
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Calculator"
        title="Pool volume calculator"
        lede="Gallons and liters from the shape of the pool. The result carries into the salt and chlorine calculators."
      />
      <CallUsTopBar />
      <div className="container-page pt-14 pb-28 md:pb-14">
        <Suspense fallback={<CalculatorFallback />}>
          <PoolVolumeCalculator />
        </Suspense>

        <section className="mt-14 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-pool-950">Formulas and assumptions</h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-pool-900/80 md:text-base">
            <p>
              A US gallon is 231 cubic inches and a cubic foot is 1,728 cubic inches, so one cubic foot
              holds {GALLONS_PER_CUBIC_FOOT.toFixed(4)} gallons (1,728 ÷ 231). Liters are US gallons ×{" "}
              {LITERS_PER_US_GALLON}. Field charts often round the gallon factor to 7.5. This calculator
              keeps the exact factor.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Rectangle: length × width × average depth.</li>
              <li>Round: π × radius² × average depth. Radius is half the diameter.</li>
              <li>Oval: π × (length ÷ 2) × (width ÷ 2) × average depth, which is an ellipse. A racetrack with straight sides holds a bit more.</li>
              <li>Kidney: length × width × average depth × {KIDNEY_FILL_FACTOR}. The {KIDNEY_FILL_FACTOR} factor is the share of the bounding rectangle a typical kidney fills.</li>
              <li>Shallow and deep: average depth = (shallow + deep) ÷ 2, assuming a straight slope.</li>
              <li>Feet and inches: total feet = feet + inches ÷ 12. Inches must be from 0 up to, but not including, 12.</li>
            </ul>
            <p>
              Gallons are what the{" "}
              <Link href="/tools/chlorine" className="font-semibold text-pool-800 underline decoration-pool-300">
                chlorine calculator
              </Link>{" "}
              and{" "}
              <Link href="/tools/salt" className="font-semibold text-pool-800 underline decoration-pool-300">
                salt calculator
              </Link>{" "}
              need. The meaning of the dose is covered in{" "}
              <Link href="/learn/water-chemistry-basics" className="font-semibold text-pool-800 underline decoration-pool-300">
                water chemistry basics
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-pool-950">How to measure</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-pool-900/80 md:text-base">
            {steps.map((step) => (
              <li key={step.name}>
                <strong className="font-semibold text-pool-950">{step.name}. </strong>
                {step.text}
              </li>
            ))}
          </ol>
        </section>

        <FaqList items={faqs} />
        <Disclaimer />
        <RelatedTools current="pool-volume" />
        <BookCta
          title="Know the gallons. We'll handle the water."
          body="Openings, weekly service, and closings start from a test on site. Tell us the town and the pool, and we will quote the scope before anyone is on the route."
        />
      </div>
      <CallUsSticky />
    </>
  );
}
