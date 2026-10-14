import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { QuoteForm } from "@/components/QuoteForm";
import { siteConfig } from "@/lib/site-config";
import type { Service } from "@/lib/types";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: `Contact | ${siteConfig.brandName}`,
};


async function getServices(): Promise<Service[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("active", true)
    .order("sort_order");
  return data ?? [];
}


export default async function ContactPage() {
  const services = await getServices();


  return (
    <>
      <section className="bg-pool-950 py-20">
        <div className="container-page">
          <p className="section-eyebrow text-pool-300">Contact</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold text-white md:text-5xl">
            Get a free quote
          </h1>
          <p className="mt-4 max-w-xl text-pool-100/80">
            Tell us a bit about your pool and we'll follow up within one
            business day.
          </p>
        </div>
      </section>


      <section className="container-page grid gap-12 py-20 lg:grid-cols-[1fr,1.4fr]">
        <div className="space-y-8">
          <div className="rounded-2xl border border-pool-100 p-7">
            <h2 className="text-lg font-semibold text-pool-950">
              Reach us directly
            </h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-pool-500" />
                <a href={siteConfig.phoneHref} className="font-medium text-pool-950">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-pool-500" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-medium text-pool-950"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-pool-500" />
                <span className="font-medium text-pool-950">
                  {siteConfig.serviceAreaFull}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-pool-500" />
                <span className="font-medium text-pool-950">
                  Mon–Sat, 8am–6pm
                </span>
              </li>
            </ul>
          </div>


          <div className="rounded-2xl bg-pool-50 p-7 text-sm text-pool-900/75">
            <p className="font-semibold text-pool-950">
              Already a customer?
            </p>
            <p className="mt-2">
              Check the live status of your service ticket — no call needed
              — on the{" "}
              <a href="/ticket-status" className="font-semibold text-pool-600 underline">
                Check Service Status
              </a>{" "}
              page.
            </p>
          </div>
        </div>


        <div className="rounded-3xl border border-pool-100 bg-white p-8 shadow-soft">
          <QuoteForm services={services} />
        </div>
      </section>
    </>
  );
}
