import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { formatMailingAddress, siteConfig } from "@/lib/site-config";


export function Footer() {
  return (
    <footer className="bg-pool-950 text-pool-100">
      <div className="container-page grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo dark />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-pool-200/80">
            {siteConfig.tagline} Professional pool cleaning, maintenance, and
            repair serving {siteConfig.serviceAreaFull}.
          </p>
          <p className="mt-4 text-xs text-pool-300/70">
            {siteConfig.legalName}
            <br />
            {formatMailingAddress()}
            <br />
            NJ HIC License #{siteConfig.hicLicense}
          </p>
          <p className="mt-3 text-xs text-pool-300/55">
            Part of {siteConfig.parentCompany.name}
          </p>
        </div>


        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-pool-300/70">
            Company
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-pool-200/80">
            <li>
              <Link href="/services" className="hover:text-white">
                Services
              </Link>
            </li>
            <li>
              <Link href="/packages" className="hover:text-white">
                Packages
              </Link>
            </li>
            <li>
              <Link href="/quote/sample" className="hover:text-white">
                Sample quote
              </Link>
            </li>
            <li>
              <Link href="/service-area" className="hover:text-white">
                Service Area
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/ticket-status" className="hover:text-white">
                Check Service Status
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>


        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-pool-300/70">
            Get In Touch
          </p>
          <ul className="mt-4 space-y-3 text-sm text-pool-200/80">
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-pool-400" />
              <a href={siteConfig.phoneHref} className="hover:text-white">
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-pool-400" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-pool-400" />
              <span>
                {formatMailingAddress()}
                <br />
                <span className="text-pool-300/60">{siteConfig.serviceArea}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>


      <div className="border-t border-white/10 py-6">
        <div className="container-page flex flex-col items-center justify-between gap-3 text-xs text-pool-300/60 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.legalName}. All
            rights reserved. &middot; NJ HIC License #{siteConfig.hicLicense}
          </p>
          <p>Built on the Keepers NJ platform.</p>
        </div>
      </div>
    </footer>
  );
}
