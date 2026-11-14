import Link from "next/link";
import { SERVICE_TYPES, type ServiceType } from "@/lib/guide-types";

export function ServiceTags({ types }: { types: ServiceType[] }) {
  const tags = SERVICE_TYPES.filter((service) => types.includes(service.id));
  if (tags.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((service) => (
        <li key={service.id}>
          <Link
            href={`/learn?service=${service.id}`}
            className="inline-flex rounded-full bg-pool-50 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-pool-800 ring-1 ring-pool-100 hover:bg-pool-100"
          >
            {service.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function ServiceFilter({ selected }: { selected: ServiceType | null }) {
  const items: { id: ServiceType | null; label: string; href: string }[] = [
    { id: null, label: "All guides", href: "/learn" },
    ...SERVICE_TYPES.map((service) => ({
      id: service.id,
      label: service.label,
      href: `/learn?service=${service.id}`,
    })),
  ];

  return (
    <nav aria-label="Filter guides by service" className="flex flex-wrap gap-2">
      {items.map((item) => {
        const active = item.id === selected;
        return (
          <Link
            key={item.label}
            href={item.href}
            aria-current={active ? "true" : undefined}
            className={
              active
                ? "rounded-full bg-pool-800 px-4 py-2 text-sm font-bold text-white"
                : "rounded-full border border-pool-200 bg-white px-4 py-2 text-sm font-semibold text-pool-800 hover:border-pool-400"
            }
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
