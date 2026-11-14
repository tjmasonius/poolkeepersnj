import Link from "next/link";
import type { Crumb } from "@/lib/seo";

export function Breadcrumbs({ items, tone = "dark" }: { items: Crumb[]; tone?: "dark" | "light" }) {
  const linkClass =
    tone === "dark"
      ? "text-pool-200 hover:text-white"
      : "text-pool-700 hover:text-pool-950";
  const currentClass = tone === "dark" ? "text-white" : "text-pool-950";
  const sepClass = tone === "dark" ? "text-pool-400" : "text-pool-400";

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {index > 0 ? (
                <span className={sepClass} aria-hidden="true">
                  /
                </span>
              ) : null}
              {last ? (
                <span className={`font-medium ${currentClass}`} aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className={linkClass}>
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
