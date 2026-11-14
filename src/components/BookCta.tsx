import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function BookCta({
  title = "Want this handled on a route?",
  body = "Pool Keepers tests, treats, and keeps the schedule. Openings, closings, and weekly maintenance are booked by quote, with the scope written down before we start.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="mt-14 rounded-3xl bg-pool-950 px-6 py-10 text-white md:px-10">
      <h2 className="max-w-xl text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-pool-100/80 md:text-base">
        {body}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/contact" className="btn-primary">
          Get a quote <ArrowRight className="h-4 w-4" />
        </Link>
        <a href={siteConfig.phoneHref} className="btn-dark border border-white/15">
          <Phone className="h-4 w-4" aria-hidden />
          Call us
          <span>{siteConfig.phone}</span>
        </a>
      </div>
    </section>
  );
}
