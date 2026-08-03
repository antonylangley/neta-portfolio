import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

const siteTitle = "Neta Rogovsky - HCI & UI/UX Designer";
const siteDescription =
  "Portfolio for Neta Rogovsky, an HCI student and UI/UX designer creating thoughtful digital experiences through research, interaction design, and visual systems.";

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: "%s | Neta Rogovsky",
  },
  description: siteDescription,
  authors: [{ name: "Neta Rogovsky" }],
  keywords: [
    "Neta Rogovsky",
    "HCI",
    "UI/UX designer",
    "NJIT",
    "portfolio",
    "Figma",
    "interaction design",
  ],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
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
      className={`${plexSans.variable} ${plexMono.variable} ${newsreader.variable}`}
    >
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
