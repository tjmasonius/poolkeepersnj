import { siteConfig } from "@/lib/site-config";


/** Safe-area aware sticky Call + Get quote bar (mobile only). */
export function StickyMobileCTA() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-pool-100 bg-white/96 px-3 pt-2.5 backdrop-blur md:hidden"
      style={{ paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <a
        href={siteConfig.phoneHref}
        className="rounded-full bg-pool-800 py-3 text-center text-sm font-extrabold text-white"
      >
        Call
      </a>
      <a
        href="/contact"
        className="rounded-full bg-pool-500 py-3 text-center text-sm font-extrabold text-pool-950"
      >
        Get quote
      </a>
    </div>
  );
}
