import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.metadata.siteUrl),
  title: {
    default: site.metadata.title,
    template: `%s | ${site.name}`,
  },
  description: site.metadata.description,
  authors: [{ name: site.metadata.author }],
  keywords: site.metadata.keywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: site.metadata.title,
    description: site.metadata.description,
    url: site.metadata.siteUrl,
    siteName: `${site.name} Portfolio`,
    type: "website",
    images: [
      {
        url: site.metadata.openGraphImage,
        width: 1200,
        height: 630,
        alt: "Neta HCI and UI/UX design portfolio social preview.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.metadata.title,
    description: site.metadata.description,
    images: [site.metadata.openGraphImage],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main className="flex-1" id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
