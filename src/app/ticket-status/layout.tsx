import type { ReactNode } from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Check Service Status | ${siteConfig.brandName}`,
  description: `Look up a Pool Keepers ticket and see whether the visit is requested, scheduled, in progress, or complete.`,
  path: "/ticket-status",
});

export default function TicketStatusLayout({ children }: { children: ReactNode }) {
  return children;
}
