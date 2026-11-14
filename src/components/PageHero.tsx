import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { Crumb } from "@/lib/seo";

export function PageHero({
  eyebrow,
  title,
  lede,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  crumbs: Crumb[];
}) {
  return (
    <section className="bg-pool-950 py-16 md:py-20">
      <div className="container-page">
        <Breadcrumbs items={crumbs} />
        <p className="section-eyebrow mt-6 text-pool-300">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-white md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-pool-100/80 md:text-lg">
          {lede}
        </p>
      </div>
    </section>
  );
}
