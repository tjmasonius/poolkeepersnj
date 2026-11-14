import type { ReactNode } from "react";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { BookCta } from "@/components/BookCta";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/guides/FaqList";
import { CORE_SERVICES, type CoreService } from "@/lib/services";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, type Crumb } from "@/lib/seo";
import type { Metadata } from "next";

export function serviceMetadata(service: CoreService): Metadata {
  return buildMetadata({
    title: `${service.title} | Pool Keepers NJ`,
    description: service.description,
    path: service.href,
  });
}

export function ServiceLayout({
  service,
  lede,
  children,
  faqs,
}: {
  service: CoreService;
  lede: string;
  children: ReactNode;
  faqs: { q: string; a: string }[];
}) {
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.navLabel, path: service.href },
  ];
  const others = CORE_SERVICES.filter((item) => item.href !== service.href);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero crumbs={crumbs} eyebrow={service.eyebrow} title={service.title} lede={lede} />
      <div className="container-page py-14">
        <div className="max-w-3xl space-y-4 text-base leading-relaxed text-pool-900/85">{children}</div>
        <aside className="mt-12 rounded-3xl border border-pool-100 bg-pool-50 p-6 md:p-8">
          <h2 className="text-xl font-bold text-pool-950">The other core services</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {others.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-2xl border border-pool-100 bg-white px-4 py-4 text-sm font-semibold text-pool-800 hover:border-pool-400"
                >
                  {item.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <FaqList items={faqs} />
        <BookCta />
      </div>
    </>
  );
}
