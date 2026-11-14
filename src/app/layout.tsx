import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site-config";
import { localBusinessJsonLd } from "@/lib/seo";

const title = `${siteConfig.brandName} | Pool Cleaning, Maintenance & Repair in NJ`;
const description = `${siteConfig.tagline} Professional pool cleaning, weekly maintenance, openings, closings, and equipment repair serving ${siteConfig.serviceAreaFull}.`;

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(`https://${siteConfig.domain}`),
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: siteConfig.brandName,
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary", title, description },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <JsonLd data={localBusinessJsonLd()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
