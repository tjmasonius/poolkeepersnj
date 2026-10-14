import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/lib/site-config";


export const metadata: Metadata = {
  title: `${siteConfig.brandName} | Pool Cleaning, Maintenance & Repair in NJ`,
  description: `${siteConfig.tagline} Professional pool cleaning, maintenance, openings/closings, equipment repair, and safety covers serving ${siteConfig.serviceAreaFull}.`,
  metadataBase: new URL(`https://${siteConfig.domain}`),
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
