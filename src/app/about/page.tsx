import Link from "next/link";
import { ArrowRight, ShieldCheck, Users, Wrench, Award } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: `About | ${siteConfig.brandName}`,
};


const VALUES = [
  {
    icon: ShieldCheck,
    title: "Licensed & insured",
    body: "Every job is backed by proper New Jersey licensing and insurance — no shortcuts.",
  },
  {
    icon: Users,
    title: "Local, family-run",
    body: "Rooted on the Jersey Shore, with a service history that goes back a generation.",
  },
  {
    icon: Wrench,
    title: "Real technicians",
    body: "We work on the equipment brands homeowners actually have — Hayward, Pentair, Jandy — every day.",
  },
  {
    icon: Award,
    title: "Accountable by design",
    body: "Every job is a tracked ticket from request to completion, so nothing gets lost.",
  },
];


export default function AboutPage() {
  return (
    <>
      <section className="bg-pool-950 py-20">
        <div className="container-page">
          <p className="section-eyebrow text-pool-300">About Us</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold text-white md:text-5xl">
            A pool company built on doing it right
          </h1>
        </div>
      </section>


      <section className="container-page py-20">
        <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-pool-900/80">
          <p>
            {siteConfig.legalName} provides professional pool cleaning,
            maintenance, and repair across {siteConfig.serviceAreaFull}. Our
            approach is simple: show up when we say we will, do the work
            right the first time, and give homeowners a clear, trackable
            record of every service instead of a guessing game.
          </p>
          <p>
            {siteConfig.parentCompany.note} — every job runs through the same
            standards, the same scheduling system, and the same
            accountability, whether it's a quick weekly cleaning or a full
            equipment installation.
          </p>
        </div>


        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-pool-100 p-7"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pool-50 text-pool-600">
                <v.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-pool-950">
                {v.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-pool-900/70">
                {v.body}
              </p>
            </div>
          ))}
        </div>


        <div className="mt-16 text-center">
          <Link href="/contact" className="btn-primary">
            Get a Free Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
