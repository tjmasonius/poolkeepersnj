import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { BookCta } from "@/components/BookCta";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/guides/FaqList";
import { GUIDE_CATEGORIES, isServiceType, SERVICE_TYPES } from "@/lib/guide-types";
import { getAllGuides, guidesInCategory } from "@/lib/guides";
import { ServiceFilter, ServiceTags } from "@/components/guides/ServiceTags";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";

const title = "Pool Care Guides | Pool Keepers NJ";
const description =
  "A pool care library for New Jersey: chemistry, algae, openings, closings, winterizing, and equipment. Written for the way our pools actually run.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/learn",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Guides", path: "/learn" },
];

const faqs = [
  {
    q: "Do these guides replace a water test?",
    a: "No. They explain what to do with a test you already took. Free chlorine, pH, salt, and CYA still have to be measured on your pool.",
  },
  {
    q: "Are the chemical ranges the same ones the calculators use?",
    a: "Yes. Everyday free chlorine is at least about 7.5% of CYA. A shock hold is about 40% of CYA. The salt calculator starts at 3200 ppm and should be edited to your generator manual.",
  },
  {
    q: "Can Pool Keepers do the work instead?",
    a: "Yes. Openings, weekly maintenance, and closings are separate services with a written scope. The guides link to those pages. Pricing is on the quote or the packages page, not in the articles.",
  },
];

export default async function LearnIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const selected = isServiceType(service) ? service : null;
  const selectedLabel = SERVICE_TYPES.find((item) => item.id === selected)?.label;
  const total = getAllGuides().filter((guide) => !selected || guide.serviceTypes.includes(selected)).length;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Guides"
        title="Pool care guides"
        lede={`${total} practical articles for residential pools in Monmouth, Ocean, Middlesex, and Mercer Counties. Chemistry, season, and equipment, with the calculators linked where a dose depends on gallons.`}
      />
      <div className="container-page py-14">
        <ServiceFilter selected={selected} />
        <p className="mt-4 text-sm text-pool-900/70">
          {selectedLabel
            ? `${total} ${total === 1 ? "guide" : "guides"} tagged ${selectedLabel}.`
            : `${total} guides. Filter by the visit they belong with.`}
        </p>
        <div className="mt-10 grid gap-10">
          {GUIDE_CATEGORIES.map((category) => {
            const articles = guidesInCategory(category.id).filter(
              (guide) => !selected || guide.serviceTypes.includes(selected),
            );
            if (articles.length === 0) return null;
            return (
              <section key={category.id} aria-labelledby={`cat-${category.id}`}>
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h2 id={`cat-${category.id}`} className="text-2xl font-bold text-pool-950">
                      <Link href={`/learn/${category.id}`} className="hover:text-pool-700">
                        {category.title}
                      </Link>
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-pool-900/70">
                      {category.lede}
                    </p>
                  </div>
                  <Link
                    href={`/learn/${category.id}`}
                    className="text-sm font-semibold text-pool-700"
                  >
                    {articles.length} articles
                  </Link>
                </div>
                <ul className="mt-5 grid gap-3 md:grid-cols-2">
                  {articles.map((article) => (
                    <li key={article.slug} className="rounded-2xl border border-pool-100 px-4 py-4">
                      <ServiceTags types={article.serviceTypes} />
                      <Link
                        href={`/learn/${article.slug}`}
                        className="mt-2 block font-semibold text-pool-950 hover:text-pool-700"
                      >
                        {article.title}
                      </Link>
                      <p className="mt-2 text-sm leading-relaxed text-pool-900/65">
                        {article.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
        <FaqList items={faqs} />
        <BookCta />
      </div>
    </>
  );
}
