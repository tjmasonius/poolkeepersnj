import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Payment received | ${siteConfig.brandName}`,
};

export default function CheckoutSuccessPage() {
  return (
    <>
      <section className="bg-pool-950 py-20">
        <div className="container-page">
          <p className="section-eyebrow text-pool-300">Checkout</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold text-white md:text-5xl">
            Thank you
          </h1>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="mx-auto max-w-lg rounded-3xl border border-emerald-200 bg-emerald-50 p-10 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
          <h2 className="mt-4 text-xl font-semibold text-pool-950">
            Payment received
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-pool-900/70">
            The office will schedule your opening or closing and put it on the
            calendar. We will reach out if we need gate codes or access notes.
          </p>
          <p className="mt-4 text-sm text-pool-900/70">
            If you later receive a ticket number and access code, you can check
            status here:
          </p>
          <Link href="/ticket-status" className="btn-primary mt-6">
            Check service status
          </Link>
          <p className="mt-8 text-xs leading-relaxed text-pool-900/55">
            {siteConfig.legalName} &middot; NJ HIC License #{siteConfig.hicLicense}.{" "}
            {siteConfig.njContractorNotice}
          </p>
        </div>
      </section>
    </>
  );
}
