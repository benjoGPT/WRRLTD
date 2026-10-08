import type { Metadata, Viewport } from "next";
import { Red_Hat_Display, Red_Hat_Text } from "next/font/google";
import { site, siteUrl } from "@/config/site";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollEffects } from "@/components/ScrollEffects";
import { StickyCvButton } from "@/components/StickyCvButton";
import { CookieBanner } from "@/components/cookies/CookieBanner";
import "./globals.css";

// Fonts are downloaded at build time and served from our own domain, so
// there's no request to Google when someone visits the site.
// Red Hat Display for headings and Red Hat Text for body copy: a matched
// pair, so headings and text feel like one family. Text is drawn for small
// sizes and stays easy to read on phones.
const display = Red_Hat_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

const text = Red_Hat_Text({
  variable: "--font-text",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | Recruitment in ${site.locality}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    url: "/",
  },
  // Keeps the whole site out of search results until launch.
  robots: site.isLive ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#07284b",
  // Lets the layout use the safe areas around notches and home indicators.
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${display.variable} ${text.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <ScrollEffects />
        <StickyCvButton />
        {site.cookieBanner && <CookieBanner />}
      </body>
    </html>
  );
}
