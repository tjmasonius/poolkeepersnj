import { siteConfig } from "@/lib/site-config";
import { CheckoutForm } from "@/components/CheckoutForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Checkout | ${siteConfig.brandName}`,
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string; canceled?: string }>;
}) {
  const params = await searchParams;
  return (
    <>
      <section className="bg-pool-950 py-20">
        <div className="container-page">
          <p className="section-eyebrow text-pool-300">Checkout</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold text-white md:text-5xl">
            Book opening or closing
          </h1>
          <p className="mt-4 max-w-xl text-pool-100/80">
            Pay securely with Stripe. After payment, the office will put your
            visit on the calendar. Price includes heater and waterfall. Spa
            is extra. Call {siteConfig.phone} if you need help.
          </p>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="mx-auto max-w-xl rounded-3xl border border-pool-100 bg-white p-8 shadow-soft">
          <CheckoutForm
            initialPackage={params.package}
            canceled={params.canceled === "1"}
          />
        </div>
      </section>
    </>
  );
}
