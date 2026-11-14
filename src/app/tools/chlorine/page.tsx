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
import { ChlorineCalculator } from "@/components/tools/ChlorineCalculator";
import { RelatedTools } from "@/components/tools/RelatedTools";
import {
  CYA_MIN_FC_RATIO,
  CYA_SLAM_RATIO,
  LIQUID_CHLORINE_CHART_DIVISOR,
  WATER_POUNDS_PER_GALLON,
  dryProductOunces,
  liquidChlorineFluidOunces,
} from "@/lib/pool-math";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, howToJsonLd, webAppJsonLd } from "@/lib/seo";

const path = "/tools/chlorine";
const title = "Pool Chlorine Calculator | Pool Keepers NJ";
const description =
  "Dose liquid chlorine, cal-hypo, dichlor, or trichlor from gallons and free chlorine. Includes the CYA minimum (7.5% of CYA) and a shock / SLAM note.";

export const metadata: Metadata = buildMetadata({ title, description, path });

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Calculators", path: "/tools" },
  { name: "Chlorine", path },
];

const liquid125 = liquidChlorineFluidOunces(10000, 1, 12.5);
const calHypo = dryProductOunces(10000, 1, 65);

const steps = [
  {
    name: "Test free chlorine",
    text: "Use free chlorine, not total. A FAS-DPD drop test is the reading this dose expects.",
  },
  {
    name: "Set a target from CYA",
    text: "Everyday free chlorine should be at least about 7.5% of CYA. Enter CYA and the calculator will show that floor and the higher shock / SLAM level.",
  },
  {
    name: "Match the product on the label",
    text: "Liquid is measured in fluid ounces from the field chart. Dry products are measured by weight from the percent of available chlorine. Add with the pump running, and never mix two products in one bucket.",
  },
];

const faqs = [
  {
    q: "Why does the chlorine target depend on CYA?",
    a: "Stabilizer holds chlorine so the sun does not burn it off in an afternoon, and it also holds some of it back from working. A free-chlorine reading of 1 to 3 ppm is too low once CYA is up in the normal outdoor range. Keeping FC at least about 7.5% of CYA is the practical minimum.",
  },
  {
    q: "What is the shock / SLAM level?",
    a: "SLAM means holding free chlorine near 40% of CYA until the pool is clear, combined chlorine is low, and the pool does not lose a large amount of chlorine overnight. It is higher than the everyday target. Liquid chlorine is the usual product because it does not add CYA or calcium.",
  },
  {
    q: "Which product should I pick?",
    a: "Liquid chlorine (10% or 12.5%) adds no stabilizer and no calcium. Cal-hypo adds calcium. Dichlor and trichlor add CYA, so they are a poor choice for repeated shocks. Match the percent on your jug or bag.",
  },
];

export default function ChlorineToolPage() {
  return (
    <>
      <JsonLd data={webAppJsonLd({ name: "Pool chlorine calculator", description, path })} />
      <JsonLd
        data={howToJsonLd({
          name: "How to estimate a chlorine dose",
          description: "Test free chlorine, set a CYA-based target, and measure the product that matches the label.",
          path,
          steps,
        })}
      />
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Calculator"
        title="Chlorine calculator"
        lede="Liquid, cal-hypo, dichlor, or trichlor, in the unit you can measure. The CYA line shows the everyday minimum and the shock level."
      />
      <CallUsTopBar />
      <div className="container-page pt-14 pb-28 md:pb-14">
        <Suspense fallback={<CalculatorFallback />}>
          <ChlorineCalculator />
        </Suspense>

        <section className="mt-14 max-w-3xl space-y-4 text-sm leading-relaxed text-pool-900/80 md:text-base">
          <h2 className="text-2xl font-bold tracking-tight text-pool-950">Formulas and assumptions</h2>
          <p>
            Dry products use the definition of ppm. Ounces by weight = gallons × ppm increase ×{" "}
            {WATER_POUNDS_PER_GALLON} ÷ (percent available chlorine × 10,000) × 16. For 65% cal-hypo, 10,000
            gallons, and 1 ppm, that is {calHypo.toFixed(2)} ounces, the familiar &quot;about 2 ounces&quot; rule.
          </p>
          <p>
            Liquid chlorine is dosed by volume with the standard field chart: {liquid125.toFixed(0)} fluid
            ounces of 12.5% raises 10,000 gallons by 1 ppm. The chart is fluid ounces = gallons × ppm
            increase ÷ (percent × {LIQUID_CHLORINE_CHART_DIVISOR}). Ten percent liquid is a larger volume for
            the same ppm. We use the chart rather than pretending the jug weighs the same as water.
          </p>
          <p>
            Everyday free chlorine should be at least about {Math.round(CYA_MIN_FC_RATIO * 1000) / 10}% of
            CYA. A shock / SLAM hold is about {Math.round(CYA_SLAM_RATIO * 100)}% of CYA. Combined chlorine
            is a separate problem: breakpoint chlorination is often figured near 10 times the combined
            chlorine reading. Those are targets, not a reason to skip the label.
          </p>
          <p>
            Read the chemistry in{" "}
            <Link href="/learn/ph-and-chlorine" className="font-semibold text-pool-800 underline decoration-pool-300">
              pH and chlorine
            </Link>
            ,{" "}
            <Link href="/learn/cya-stabilizer" className="font-semibold text-pool-800 underline decoration-pool-300">
              stabilizer
            </Link>
            , and{" "}
            <Link href="/learn/how-to-shock-a-pool" className="font-semibold text-pool-800 underline decoration-pool-300">
              how to shock
            </Link>
            . Gallons come from the{" "}
            <Link href="/tools/pool-volume" className="font-semibold text-pool-800 underline decoration-pool-300">
              volume calculator
            </Link>
            .
          </p>
          <h2 className="pt-4 text-2xl font-bold tracking-tight text-pool-950">How to use the result</h2>
          <ol className="list-decimal space-y-3 pl-5">
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
        <RelatedTools current="chlorine" />
        <BookCta />
      </div>
      <CallUsSticky />
    </>
  );
}
