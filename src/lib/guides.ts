import { chemistryGuides } from "@/content/guides/chemistry";
import { chemistryRestGuides } from "@/content/guides/chemistry-rest";
import { treatmentGuides } from "@/content/guides/treatment";
import { problemGuides } from "@/content/guides/problems";
import { seasonalGuides } from "@/content/guides/seasonal";
import { equipmentAGuides } from "@/content/guides/equipment-a";
import { equipmentBGuides } from "@/content/guides/equipment-b";
import {
  CALCULATOR_LINKS,
  GUIDE_CATEGORIES,
  type CalculatorId,
  type GuideCategory,
  type GuideCategoryId,
  type GuideInput,
} from "@/lib/guide-types";
import { countWords, extractFaqs, parseMarkdown, type Block, type FaqItem } from "@/lib/markdown";
import { PUBLISHED } from "@/lib/services";

export type Guide = GuideInput & {
  published: string;
  updated: string;
  words: number;
  minutes: number;
  blocks: Block[];
  faqs: FaqItem[];
};

const INPUTS: GuideInput[] = [
  ...chemistryGuides,
  ...chemistryRestGuides,
  ...treatmentGuides,
  ...problemGuides,
  ...seasonalGuides,
  ...equipmentAGuides,
  ...equipmentBGuides,
];

function buildGuide(input: GuideInput): Guide {
  const blocks = parseMarkdown(input.markdown);
  const words = countWords(input.markdown);
  return {
    ...input,
    published: PUBLISHED,
    updated: PUBLISHED,
    words,
    minutes: Math.max(1, Math.round(words / 220)),
    blocks,
    faqs: extractFaqs(blocks),
  };
}

const GUIDES: Guide[] = INPUTS.map(buildGuide);

function assertCatalog(guides: Guide[]) {
  const slugs = new Set<string>();
  const categoryIds = new Set(GUIDE_CATEGORIES.map((category) => category.id));
  for (const guide of guides) {
    if (slugs.has(guide.slug)) throw new Error(`Duplicate guide slug ${guide.slug}`);
    slugs.add(guide.slug);
    if (categoryIds.has(guide.slug as GuideCategoryId)) {
      throw new Error(`Guide slug collides with a category: ${guide.slug}`);
    }
  }
  for (const guide of guides) {
    for (const related of guide.related) {
      if (!slugs.has(related)) {
        throw new Error(`${guide.slug} links to missing guide ${related}`);
      }
    }
    for (const calculator of guide.calculators) {
      if (!CALCULATOR_LINKS[calculator]) {
        throw new Error(`${guide.slug} has unknown calculator ${calculator}`);
      }
    }
  }
}

assertCatalog(GUIDES);

const CATEGORY_RANK = new Map(GUIDE_CATEGORIES.map((category, index) => [category.id, index]));

export function getAllGuides(): Guide[] {
  return GUIDES.slice().sort((a, b) => {
    const category = (CATEGORY_RANK.get(a.category) ?? 0) - (CATEGORY_RANK.get(b.category) ?? 0);
    if (category !== 0) return category;
    return a.order - b.order;
  });
}

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}

export function getCategory(slug: string): GuideCategory | undefined {
  return GUIDE_CATEGORIES.find((category) => category.id === slug);
}

export function guidesInCategory(category: GuideCategoryId): Guide[] {
  return getAllGuides().filter((guide) => guide.category === category);
}

export function calculatorHref(id: CalculatorId): string {
  return CALCULATOR_LINKS[id].href;
}
