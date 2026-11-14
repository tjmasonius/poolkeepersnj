import Link from "next/link";
import { CORE_SERVICES } from "@/lib/services";

export function CoreServiceLinks({ angle }: { angle: string }) {
  return (
    <aside className="mt-12 rounded-3xl border border-pool-100 bg-pool-50 p-6 md:p-8">
      <h2 className="text-xl font-bold text-pool-950">Work with Pool Keepers</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-pool-900/80 md:text-base">
        {angle}
      </p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-3">
        {CORE_SERVICES.map((service) => (
          <li key={service.href}>
            <Link
              href={service.href}
              className="block rounded-2xl border border-pool-100 bg-white px-4 py-4 text-sm font-semibold text-pool-800 hover:border-pool-400"
            >
              {service.navLabel}
              <span className="mt-1 block text-xs font-medium text-pool-900/60">
                {service.eyebrow}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
