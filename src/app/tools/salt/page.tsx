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
import { RelatedTools } from "@/components/tools/RelatedTools";
import { SaltCalculator } from "@/components/tools/SaltCalculator";
import {
  DEFAULT_SALT_TARGET_PPM,
  SALT_BAG_POUNDS,
  WATER_POUNDS_PER_GALLON,
  saltPoundsForIncrease,
} from "@/lib/pool-math";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, howToJsonLd, webAppJsonLd } from "@/lib/seo";

const path = "/tools/salt";
const title = "Salt Calculator for Pools | Pool Keepers NJ";
const description =
  "See how many pounds of salt to add to reach a target ppm. Default target is 3200 and editable. Warns you when salt is already over the target.";

export const metadata: Metadata = buildMetadata({ title, description, path });

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Calculators", path: "/tools" },
  { name: "Salt", path },
];

const example = saltPoundsForIncrease(10000, 100);

const steps = [
  {
    name: "Test the salt",
    text: "Use a salt test kit or a meter. The number on the generator can read low when the cell is scaled or the water is cold.",
  },
  {
    name: "Set the target from the manual",
    text: "The calculator opens at 3200 ppm because that is a common midpoint for many cells. Replace it with the target printed for your model, including low-salt systems.",
  },
  {
    name: "Add pool salt only if you are under the target",
    text: "Broadcast pool-grade salt with the pump running and brush until it dissolves. If you are already over the target, do not add salt.",
  },
];

const faqs = [
  {
    q: "Why is the default target 3200 ppm?",
    a: "Many common salt chlorine generators, including a lot of Hayward AquaRite and Pentair IntelliChlor cells, list a band around 2700 to 3400 ppm. 3200 sits in the middle. It is a starting point, not a universal spec, so the field is editable.",
  },
  {
    q: "What if my salt is already over the target?",
    a: "The calculator will not tell you to add salt. Salt does not leave with evaporation. Splash-out, backwashing, and a partial drain are what lower it. Check the manual before draining for a small overage.",
  },
  {
    q: "Can I use water-softener salt?",
    a: "Use salt labeled for pools or evaporated salt that is nearly pure sodium chloride. Skip products with dirt, debris, or additives that are not meant for a pool.",
  },
];

export default function SaltToolPage() {
  return (
    <>
      <JsonLd data={webAppJsonLd({ name: "Pool salt calculator", description, path })} />
      <JsonLd
        data={howToJsonLd({
          name: "How to figure a pool salt dose",
          description: "Test salt, set the generator's target, and add pool salt only when you are under that target.",
          path,
          steps,
        })}
      />
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Calculator"
        title="Salt calculator"
        lede="Pounds of salt, and 40-pound bags, from your gallons and your ppm. The target starts at 3200 because generator models differ."
      />
      <CallUsTopBar />
      <div className="container-page pt-14 pb-28 md:pb-14">
        <Suspense fallback={<CalculatorFallback />}>
          <SaltCalculator />
        </Suspense>

        <section className="mt-14 max-w-3xl space-y-4 text-sm leading-relaxed text-pool-900/80 md:text-base">
          <h2 className="text-2xl font-bold tracking-tight text-pool-950">Formula and assumptions</h2>
          <p>
            Parts per million means pounds of salt per million pounds of water. A gallon of water weighs
            about {WATER_POUNDS_PER_GALLON} pounds, so pounds of salt = gallons × ppm increase ×{" "}
            {WATER_POUNDS_PER_GALLON} ÷ 1,000,000.
          </p>
          <p>
            Check: 10,000 gallons raised by 100 ppm needs {example.toFixed(2)} pounds. That is the familiar
            rule of about 8.3 to 8.4 pounds per 10,000 gallons per 100 ppm. Bags are {SALT_BAG_POUNDS}{" "}
            pounds, and a partial bag is rounded up so the dose is not short.
          </p>
          <p>
            The default target is {DEFAULT_SALT_TARGET_PPM} ppm. If the manual says something else, change
            the target. The calculator does not know your cell. Read more in{" "}
            <Link href="/learn/salt-vs-chlorine" className="font-semibold text-pool-800 underline decoration-pool-300">
              salt vs chlorine
            </Link>{" "}
            and{" "}
            <Link href="/learn/saltwater-pool-care" className="font-semibold text-pool-800 underline decoration-pool-300">
              saltwater pool care
            </Link>
            . Need gallons first? Use the{" "}
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
        <RelatedTools current="salt" />
        <BookCta
          title="Salt cells still need a person on the pad."
          body="We test salt with the rest of the water, clean cells when the manual calls for it, and keep weekly chlorine honest through the Jersey summer."
        />
      </div>
      <CallUsSticky />
    </>
  );
}
