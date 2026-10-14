import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: `Service Area | ${siteConfig.brandName}`,
};


export default function ServiceAreaPage() {
  return (
    <>
      <section className="bg-pool-950 py-20">
        <div className="container-page">
          <p className="section-eyebrow text-pool-300">Service Area</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold text-white md:text-5xl">
            Proudly serving {siteConfig.serviceAreaFull}
          </h1>
          <p className="mt-4 max-w-xl text-pool-100/80">
            Don't see your town listed? Reach out anyway — we're growing our
            route regularly.
          </p>
        </div>
      </section>


      <section className="container-page py-20">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {siteConfig.serviceAreaTowns.map((town) => (
            <div
              key={town}
              className="flex items-center gap-3 rounded-xl border border-pool-100 px-5 py-4"
            >
              <MapPin className="h-4 w-4 shrink-0 text-pool-500" />
              <span className="text-sm font-medium text-pool-950">
                {town}, NJ
              </span>
            </div>
          ))}
        </div>


        <div className="mt-16 flex flex-col items-center justify-between gap-8 rounded-3xl bg-pool-50 px-8 py-14 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-bold text-pool-950 md:text-3xl">
              Check if we cover your address
            </h2>
            <p className="mt-2 max-w-md text-pool-900/70">
              Send us your address with a quote request and we'll confirm
              coverage within one business day.
            </p>
          </div>
          <Link href="/contact" className="btn-primary shrink-0">
            Get a Free Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
