import Link from "next/link";
import { CALCULATOR_LINKS, type CalculatorId } from "@/lib/guide-types";

export function RelatedTools({ current }: { current?: CalculatorId }) {
  const items = (Object.keys(CALCULATOR_LINKS) as CalculatorId[]).filter((id) => id !== current);
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold tracking-tight text-pool-950">Other calculators</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {items.map((id) => {
          const tool = CALCULATOR_LINKS[id];
          return (
            <Link
              key={id}
              href={tool.href}
              className="rounded-2xl border border-pool-100 p-5 hover:border-pool-400"
            >
              <span className="text-base font-semibold text-pool-950">{tool.label}</span>
              <span className="mt-2 block text-sm leading-relaxed text-pool-900/70">{tool.text}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
