export type CalculatorId = "pool-volume" | "salt" | "chlorine";

export type GuideCategoryId =
  | "water-chemistry"
  | "treatment"
  | "water-problems"
  | "seasonal-care"
  | "equipment";

export type GuideInput = {
  slug: string;
  title: string;
  description: string;
  category: GuideCategoryId;
  order: number;
  related: string[];
  calculators: CalculatorId[];
  /** One or two sentences for the service card. No prices. */
  serviceAngle: string;
  markdown: string;
};

export type GuideCategory = {
  id: GuideCategoryId;
  title: string;
  description: string;
  lede: string;
};

export const GUIDE_CATEGORIES: GuideCategory[] = [
  {
    id: "water-chemistry",
    title: "Water chemistry",
    description:
      "Free chlorine, pH, alkalinity, calcium, stabilizer, salt, phosphates, and a testing schedule for New Jersey pools.",
    lede: "The numbers that decide whether a pool stays clear. Ranges below match the calculators on this site, including the rule that free chlorine should be at least about 7.5% of CYA.",
  },
  {
    id: "treatment",
    title: "Algae and treatment",
    description:
      "How to shock a pool and how to prevent and treat green, black, and mustard algae without guessing at the dose.",
    lede: "Chlorine, brushing, and filtration do the work. Algaecide is a helper with a label, not a replacement for a free-chlorine reading.",
  },
  {
    id: "water-problems",
    title: "Water problems",
    description:
      "Cloudy water, foam, and pool leaks, including how to run a bucket test before you drain a New Jersey pool.",
    lede: "Look at the test and the equipment before you add a clarifier. Cloudiness, foam, and water loss have different causes and different fixes.",
  },
  {
    id: "seasonal-care",
    title: "Seasonal care in New Jersey",
    description:
      "Opening and closing checklists, winterizing, the NJ swim season, weekly maintenance, and what to do after a storm.",
    lede: "Shore and inland New Jersey do not freeze, open, or green up on the same week. These guides use water temperature and the four counties we serve, not a single national date.",
  },
  {
    id: "equipment",
    title: "Equipment",
    description:
      "Pumps, sand, cartridge, and DE filters, heaters, salt cells, filter pressure, covers, and robotic cleaners.",
    lede: "Most 'broken' equipment is a flow, air, or chemistry problem you can see from the pad. These guides cover the safe checks, then the point where a technician should take over.",
  },
];

export const CALCULATOR_LINKS: Record<
  CalculatorId,
  { href: string; label: string; text: string }
> = {
  "pool-volume": {
    href: "/tools/pool-volume",
    label: "Pool volume calculator",
    text: "Gallons and liters for rectangle, round, oval, and kidney pools.",
  },
  salt: {
    href: "/tools/salt",
    label: "Salt calculator",
    text: "Pounds of salt, and 40-pound bags, to move from your current ppm to a target.",
  },
  chlorine: {
    href: "/tools/chlorine",
    label: "Chlorine calculator",
    text: "Liquid, cal-hypo, dichlor, or trichlor for a free-chlorine target, with CYA guidance.",
  },
};
