import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { GUIDE_CATEGORIES, SERVICE_TYPES } from "@/lib/guide-types";
import { getAllGuides, getCategory, getGuide } from "@/lib/guides";
import { CORE_SERVICES } from "@/lib/services";

const REQUIRED = [
  "pool-opening-checklist",
  "pool-closing-checklist",
  "weekly-pool-maintenance",
  "salt-vs-chlorine",
  "algae-prevention",
  "clear-a-green-pool",
  "black-algae",
  "mustard-algae",
  "ph-and-chlorine",
  "total-alkalinity",
  "calcium-hardness",
  "cya-stabilizer",
  "winterizing-a-pool-in-nj",
  "pump-wont-prime",
  "heater-wont-fire",
  "salt-cell-errors",
  "filter-pressure",
  "filter-care",
  "cloudy-water",
  "pool-foam",
  "pool-leaks",
  "how-to-shock-a-pool",
  "phosphates",
  "pool-covers",
  "robotic-pool-cleaners",
  "after-rain-and-storms",
  "how-often-to-test",
  "water-chemistry-basics",
  "saltwater-pool-care",
  "nj-pool-season",
  "pool-equipment-basics",
];

describe("guide catalog", () => {
  const guides = getAllGuides();

  it("publishes at least 30 original articles across every category", () => {
    expect(guides.length).toBeGreaterThanOrEqual(30);
    expect(new Set(guides.map((guide) => guide.slug)).size).toBe(guides.length);
    for (const category of GUIDE_CATEGORIES) {
      expect(guides.some((guide) => guide.category === category.id)).toBe(true);
      expect(getCategory(category.id)?.title).toBe(category.title);
    }
    for (const slug of REQUIRED) {
      expect(getGuide(slug)?.slug).toBe(slug);
    }
  });

  it("keeps each article thorough, linked, and free of pricing", () => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    const short = guides
      .filter((guide) => guide.words < 800)
      .map((guide) => `${guide.slug}:${guide.words}`);
    const long = guides
      .filter((guide) => guide.words > 1700)
      .map((guide) => `${guide.slug}:${guide.words}`);
    const missingTools = guides
      .filter((guide) => !guide.markdown.includes("/tools/"))
      .map((guide) => guide.slug);
    expect(short, "under 800 words").toEqual([]);
    expect(long, "over 1700 words").toEqual([]);
    expect(missingTools, "missing /tools/ link").toEqual([]);
    for (const guide of guides) {
      expect(guide.faqs.length, guide.slug).toBeGreaterThanOrEqual(3);
      expect(guide.calculators.length, guide.slug).toBeGreaterThan(0);
      for (const service of CORE_SERVICES) {
        expect(guide.markdown, guide.slug).toContain(service.href);
      }
      expect(guide.markdown).not.toMatch(/\$\d/);
      expect(titles.has(guide.title)).toBe(false);
      expect(descriptions.has(guide.description)).toBe(false);
      titles.add(guide.title);
      descriptions.add(guide.description);
      expect(guide.description.length).toBeGreaterThan(80);
      expect(guide.description.length).toBeLessThan(200);
    }
  });

  it("tags every guide with the visit it belongs to", () => {
    const allowed = new Set(SERVICE_TYPES.map((service) => service.id));
    expect(getGuide("pool-opening-checklist")?.serviceTypes).toEqual(["open"]);
    expect(getGuide("pool-closing-checklist")?.serviceTypes).toEqual(["close"]);
    expect(getGuide("weekly-pool-maintenance")?.serviceTypes).toEqual(["weekly"]);
    for (const guide of guides) {
      expect(guide.serviceTypes.length, guide.slug).toBeGreaterThan(0);
      for (const serviceType of guide.serviceTypes) {
        expect(allowed.has(serviceType), guide.slug).toBe(true);
      }
    }
  });

  it("renders the three core services on the article template", () => {
    const card = readFileSync("src/components/guides/CoreServiceLinks.tsx", "utf8");
    const page = readFileSync("src/app/learn/[slug]/page.tsx", "utf8");
    expect(card).toContain("CORE_SERVICES");
    expect(page).toContain("CoreServiceLinks");
    expect(page).toContain("faqJsonLd");
    expect(page).toContain("articleJsonLd");
    expect(page).toContain("CallUsTopBar");
    expect(page).toContain("CallUsSticky");
    const callUs = readFileSync("src/components/CallUs.tsx", "utf8");
    expect(callUs).toContain("siteConfig.phoneHref");
    expect(callUs).toContain("Call us");
    for (const tool of ["page.tsx", "pool-volume/page.tsx", "salt/page.tsx", "chlorine/page.tsx"]) {
      const source = readFileSync(`src/app/tools/${tool}`, "utf8");
      expect(source, tool).toContain("CallUsTopBar");
      expect(source, tool).toContain("CallUsSticky");
    }
  });
});
