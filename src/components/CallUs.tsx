import { Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function CallUsButton({ className = "btn-dark" }: { className?: string }) {
  return (
    <a href={siteConfig.phoneHref} className={className}>
      <Phone className="h-4 w-4" aria-hidden />
      Call us
      <span>{siteConfig.phone}</span>
    </a>
  );
}

/** Sits under the page hero so the number is visible before the article. */
export function CallUsTopBar() {
  return (
    <div className="border-b border-pool-100 bg-pool-50">
      <div className="container-page flex flex-wrap items-center justify-between gap-3 py-3">
        <p className="text-sm text-pool-900/75">Need this handled on your pool?</p>
        <CallUsButton />
      </div>
    </div>
  );
}

/** Mobile-only bar. Desktop uses the top bar and the end-of-page button. */
export function CallUsSticky() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-pool-100 bg-white/96 px-3 pt-2.5 backdrop-blur md:hidden"
      style={{ paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <a
        href={siteConfig.phoneHref}
        className="flex items-center justify-center gap-2 rounded-full bg-pool-800 py-3 text-sm font-extrabold text-white"
      >
        <Phone className="h-4 w-4" aria-hidden />
        Call us
        <span>{siteConfig.phone}</span>
      </a>
    </div>
  );
}
