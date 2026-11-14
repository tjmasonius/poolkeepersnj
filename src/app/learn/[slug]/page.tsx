import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { BookCta } from "@/components/BookCta";
import { CallUsSticky, CallUsTopBar } from "@/components/CallUs";
import { ServiceTags } from "@/components/guides/ServiceTags";
import { JsonLd } from "@/components/JsonLd";
import { CoreServiceLinks } from "@/components/guides/CoreServiceLinks";
import { MarkdownBody } from "@/components/guides/MarkdownBody";
import { GUIDE_CATEGORIES } from "@/lib/guide-types";
import { CALCULATOR_LINKS } from "@/lib/guide-types";
import { getAllGuides, getCategory, getGuide, guidesInCategory } from "@/lib/guides";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return [
    ...GUIDE_CATEGORIES.map((category) => ({ slug: category.id })),
    ...getAllGuides().map((guide) => ({ slug: guide.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (category) {
    return buildMetadata({
      title: `${category.title} | Pool Keepers NJ`,
      description: category.description,
      path: `/learn/${category.id}`,
    });
  }
  const guide = getGuide(slug);
  if (!guide) return {};
  return buildMetadata({
    title: `${guide.title} | Pool Keepers NJ`,
    description: guide.description,
    path: `/learn/${guide.slug}`,
    type: "article",
    publishedTime: guide.published,
    modifiedTime: guide.updated,
  });
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

export default async function LearnSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (category) {
    const articles = guidesInCategory(category.id);
    const crumbs = [
      { name: "Home", path: "/" },
      { name: "Guides", path: "/learn" },
      { name: category.title, path: `/learn/${category.id}` },
    ];
    return (
      <>
        <JsonLd data={breadcrumbJsonLd(crumbs)} />
        <PageHero crumbs={crumbs} eyebrow="Guides" title={category.title} lede={category.lede} />
        <div className="container-page py-14">
          <ul className="grid gap-4">
            {articles.map((article) => (
              <li key={article.slug}>
                <div className="rounded-2xl border border-pool-100 px-5 py-5">
                  <ServiceTags types={article.serviceTypes} />
                  <Link
                    href={`/learn/${article.slug}`}
                    className="mt-2 block text-lg font-semibold text-pool-950 hover:text-pool-700"
                  >
                    {article.title}
                  </Link>
                  <p className="mt-2 text-sm leading-relaxed text-pool-900/70">
                    {article.description}
                  </p>
                  <p className="mt-2 text-xs font-medium text-pool-800">{article.minutes} min read</p>
                </div>
              </li>
            ))}
          </ul>
          <BookCta />
        </div>
      </>
    );
  }

  const guide = getGuide(slug);
  if (!guide) notFound();
  const categoryForGuide = GUIDE_CATEGORIES.find((item) => item.id === guide.category);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/learn" },
    {
      name: categoryForGuide?.title ?? "Guides",
      path: `/learn/${guide.category}`,
    },
    { name: guide.title, path: `/learn/${guide.slug}` },
  ];
  const headings = guide.blocks.filter((block) => block.type === "h2");
  const related = guide.related
    .map((relatedSlug) => getGuide(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: guide.title,
          description: guide.description,
          path: `/learn/${guide.slug}`,
          published: guide.published,
          modified: guide.updated,
        })}
      />
      {guide.faqs.length > 0 ? <JsonLd data={faqJsonLd(guide.faqs)} /> : null}
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero crumbs={crumbs} eyebrow={categoryForGuide?.title ?? "Guide"} title={guide.title} lede={guide.description} />
      <CallUsTopBar />
      <div className="container-page pt-14 pb-28 md:pb-14">
        <ServiceTags types={guide.serviceTypes} />
        <p className="mt-3 text-sm text-pool-900/60">
          {formatDate(guide.published)} · {guide.minutes} min read · Pool Keepers NJ
        </p>
        {headings.length > 0 ? (
          <nav aria-label="On this page" className="mt-6 max-w-3xl rounded-2xl border border-pool-100 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-pool-500">On this page</p>
            <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm">
              {headings.map((heading) =>
                heading.type === "h2" ? (
                  <li key={heading.id}>
                    <a href={`#${heading.id}`} className="font-medium text-pool-800 hover:text-pool-600">
                      {heading.text}
                    </a>
                  </li>
                ) : null,
              )}
            </ol>
          </nav>
        ) : null}
        <div className="mt-8">
          <MarkdownBody blocks={guide.blocks} />
        </div>
        <section className="mt-10 max-w-3xl">
          <h2 className="text-xl font-bold text-pool-950">Calculators</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {guide.calculators.map((id) => (
              <li key={id}>
                <Link
                  href={CALCULATOR_LINKS[id].href}
                  className="font-semibold text-pool-800 underline decoration-pool-300"
                >
                  {CALCULATOR_LINKS[id].label}
                </Link>
                <span className="text-pool-900/70">. {CALCULATOR_LINKS[id].text}</span>
              </li>
            ))}
          </ul>
        </section>
        <CoreServiceLinks angle={guide.serviceAngle} />
        {related.length > 0 ? (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-pool-950">Keep reading</h2>
            <ul className="mt-4 grid gap-3 md:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/learn/${item.slug}`}
                    className="block rounded-2xl border border-pool-100 px-4 py-4 text-sm font-semibold text-pool-800 hover:border-pool-400"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        <BookCta />
      </div>
      <CallUsSticky />
    </>
  );
}
