import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const SITE_URL = `https://${siteConfig.domain}`;

/** +1-732-295-2600 style, derived from the tel: href in site config. */
export function schemaTelephone(): string {
  const digits = siteConfig.phoneHref.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    return `+1-${digits.slice(1, 4)}-${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return siteConfig.phone;
}

export function absoluteUrl(path: string): string {
  if (path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.brandName,
      locale: "en_US",
      type,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function localBusinessJsonLd() {
  const { address } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.brandName,
    legalName: siteConfig.legalName,
    url: SITE_URL,
    telephone: schemaTelephone(),
    email: siteConfig.email,
    description: `${siteConfig.tagline} Pool cleaning, weekly maintenance, openings, closings, and equipment repair serving ${siteConfig.serviceAreaFull}.`,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.line1,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.zip,
      addressCountry: "US",
    },
    areaServed: [
      "Monmouth County, NJ",
      "Ocean County, NJ",
      "Middlesex County, NJ",
      "Mercer County, NJ",
    ],
    knowsAbout: [
      "Swimming pool maintenance",
      "Swimming pool opening",
      "Swimming pool closing",
      "Pool water chemistry",
    ],
  };
}

export function articleJsonLd({
  title,
  description,
  path,
  published,
  modified,
}: {
  title: string;
  description: string;
  path: string;
  published: string;
  modified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: published,
    dateModified: modified,
    mainEntityOfPage: absoluteUrl(path),
    author: {
      "@type": "Organization",
      name: siteConfig.brandName,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.brandName,
      url: SITE_URL,
    },
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function webAppJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: absoluteUrl(path),
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.brandName,
      telephone: schemaTelephone(),
      url: SITE_URL,
    },
  };
}

export function howToJsonLd({
  name,
  description,
  path,
  steps,
}: {
  name: string;
  description: string;
  path: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    url: absoluteUrl(path),
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}
