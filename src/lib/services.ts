export const PUBLISHED = "2026-11-14";

export type CoreService = {
  slug: "pool-openings" | "pool-closings" | "weekly-maintenance";
  href: string;
  navLabel: string;
  title: string;
  eyebrow: string;
  description: string;
  lede: string;
};

export const CORE_SERVICES: CoreService[] = [
  {
    slug: "pool-openings",
    href: "/services/pool-openings",
    navLabel: "Pool openings",
    title: "Pool openings",
    eyebrow: "Spring start-up",
    description:
      "Spring pool openings in Monmouth, Ocean, Middlesex, and Mercer Counties. Cover off, equipment started, and the water tested before swim season.",
    lede: "We take the cover off, put the equipment back in service, and start the water from a test, not a guess. Scope is written on the quote before the visit.",
  },
  {
    slug: "pool-closings",
    href: "/services/pool-closings",
    navLabel: "Pool closings",
    title: "Pool closings",
    eyebrow: "Fall winterizing",
    description:
      "Fall pool closings and winterizing for New Jersey freeze weather. Lines blown, equipment drained, and the cover on before the first hard freeze.",
    lede: "A New Jersey closing is a freeze plan. We winterize the lines and equipment, balance what we can still circulate, and cover the pool before a hard freeze finds an open pipe.",
  },
  {
    slug: "weekly-maintenance",
    href: "/services/weekly-maintenance",
    navLabel: "Weekly maintenance",
    title: "Weekly maintenance",
    eyebrow: "Route service",
    description:
      "Weekly residential pool maintenance in Ocean, Monmouth, Middlesex, and Mercer Counties. Skim, brush, baskets, a water test, and a clear list of what the visit includes.",
    lede: "Weekly service is a route, a test, and a written scope. You can see what is included and what is a separate visit, such as a filter clean or a repair.",
  },
];

export function coreService(slug: CoreService["slug"]): CoreService {
  const service = CORE_SERVICES.find((item) => item.slug === slug);
  if (!service) throw new Error(`Unknown service ${slug}`);
  return service;
}
