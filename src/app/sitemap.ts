import type { MetadataRoute } from "next";
import { GUIDE_CATEGORIES } from "@/lib/guide-types";
import { getAllGuides } from "@/lib/guides";
import { SITE_URL } from "@/lib/seo";
import { CORE_SERVICES } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-11-14T00:00:00Z");
  const staticPaths = [
    "/",
    "/about",
    "/services",
    "/packages",
    "/service-area",
    "/contact",
    "/ticket-status",
    "/learn",
    "/tools",
    "/tools/pool-volume",
    "/tools/salt",
    "/tools/chlorine",
  ];

  return [
    ...staticPaths.map((path) => ({
      url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
      lastModified: now,
    })),
    ...CORE_SERVICES.map((service) => ({
      url: `${SITE_URL}${service.href}`,
      lastModified: now,
    })),
    ...GUIDE_CATEGORIES.map((category) => ({
      url: `${SITE_URL}/learn/${category.id}`,
      lastModified: now,
    })),
    ...getAllGuides().map((guide) => ({
      url: `${SITE_URL}/learn/${guide.slug}`,
      lastModified: new Date(`${guide.updated}T00:00:00Z`),
    })),
  ];
}
