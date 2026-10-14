import Link from "next/link";
import { siteConfig } from "@/lib/site-config";


export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-xl ${
          dark ? "bg-white/10" : "bg-pool-800"
        }`}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M4 18c1.5 1.2 3 1.2 4.5 0s3-1.2 4.5 0 3 1.2 4.5 0 3-1.2 4.5 0"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M4 13c1.5 1.2 3 1.2 4.5 0s3-1.2 4.5 0 3 1.2 4.5 0 3-1.2 4.5 0"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.55"
          />
          <path
            d="M12 3v6"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="12" cy="3" r="1.4" fill="white" />
        </svg>
      </span>
      <span
        className={`text-base font-extrabold leading-tight tracking-tight ${
          dark ? "text-white" : "text-pool-800"
        }`}
      >
        Pool Keepers{" "}
        <span className={dark ? "text-pool-400" : "text-pool-500"}>NJ</span>
        <span className="sr-only"> — {siteConfig.brandName}</span>
      </span>
    </Link>
  );
}
