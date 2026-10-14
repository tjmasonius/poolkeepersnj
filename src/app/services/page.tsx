import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Icon } from "@/components/Icon";
import { siteConfig } from "@/lib/site-config";
import type { Service } from "@/lib/types";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: `Services | ${siteConfig.brandName}`,
};


export const revalidate = 300;


async function getServices(): Promise<Service[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("active", true)
    .order("sort_order");
  return data ?? [];
}


export default async function ServicesPage() {
  const services = await getServices();


  return (
    <>
      <section className="bg-pool-950 py-20">
        <div className="container-page">
          <p className="section-eyebrow text-pool-300">Services</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold text-white md:text-5xl">
            One team for everything your pool needs
          </h1>
          <p className="mt-4 max-w-xl text-pool-100/80">
            Every service below is performed by the same crew, scheduled
            through the same system, and tracked on the same ticket — so
            nothing falls through the cracks.
          </p>
        </div>
      </section>


      <section className="container-page py-20">
        <div className="flex flex-col gap-16">
          {services.map((service, i) => (
            <div
              key={service.id}
              id={service.slug}
              className="scroll-mt-28 grid gap-8 border-b border-pool-100 pb-16 last:border-0 md:grid-cols-[auto,1fr] md:gap-12"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-pool-50 text-pool-600">
                <Icon name={service.icon} className="h-8 w-8" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-pool-400">
                  0{i + 1}
                </p>
                <h2 className="mt-2 text-2xl font-bold text-pool-950">
                  {service.name}
                </h2>
                <p className="mt-3 max-w-2xl leading-relaxed text-pool-900/75">
                  {service.description}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  {service.slug === "openings-closings" && (
                    <Link
                      href="/packages"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-pool-600 hover:gap-2.5"
                    >
                      Opening & closing packages <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-pool-600 hover:gap-2.5"
                  >
                    Request this service <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      <section className="container-page pb-24">
        <div className="flex flex-col items-center justify-between gap-8 rounded-3xl bg-pool-50 px-8 py-14 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-bold text-pool-950 md:text-3xl">
              Not sure what you need?
            </h2>
            <p className="mt-2 max-w-md text-pool-900/70">
              Tell us what's going on with your pool and we'll recommend the
              right service.
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
