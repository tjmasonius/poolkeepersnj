import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon } from "./Icon";
import type { Service } from "@/lib/types";


export function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group relative flex flex-col rounded-2xl border border-pool-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pool-50 text-pool-600">
        <Icon name={service.icon} className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-pool-950">
        {service.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-pool-900/70">
        {service.short_description}
      </p>
      <Link
        href={`/services#${service.slug}`}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-pool-600 transition group-hover:gap-2.5"
      >
        Learn more <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
