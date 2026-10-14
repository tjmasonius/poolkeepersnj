"use client";


import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { siteConfig } from "@/lib/site-config";


const NAV = [
  { href: "/services", label: "Services" },
  { href: "/packages", label: "Packages" },
  { href: "/service-area", label: "Service Area" },
  { href: "/about", label: "About" },
  { href: "/ticket-status", label: "Check Service Status" },
  { href: "/contact", label: "Contact" },
];


export function Header() {
  const [open, setOpen] = useState(false);


  return (
    <header className="sticky top-0 z-50 border-b border-pool-100/70 bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Logo />


        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-pool-900/80 transition hover:text-pool-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>


        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={siteConfig.phoneHref}
            className="flex items-center gap-2 text-sm font-semibold text-pool-900"
          >
            <Phone className="h-4 w-4 text-pool-500" strokeWidth={1.75} />
            {siteConfig.phone}
          </a>
          <Link href="/contact" className="btn-primary">
            Get a quote
          </Link>
        </div>


        <button
          className="rounded-lg p-2 text-pool-900 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>


      {open && (
        <div className="border-t border-pool-100 bg-white lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-pool-900 hover:bg-pool-50"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={siteConfig.phoneHref}
              onClick={() => setOpen(false)}
              className="btn-dark mt-2 w-full"
            >
              Call {siteConfig.phone}
            </a>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary w-full"
            >
              Get a quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
