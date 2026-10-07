import type { Metadata, Viewport } from "next";
import { Figtree, Sora } from "next/font/google";
import { site, siteUrl } from "@/config/site";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Header } from "@/components/Header";
import { ScrollEffects } from "@/components/ScrollEffects";
import "./globals.css";

// Fonts are downloaded at build time and served from our own domain, so
// there's no request to Google when someone visits the site.
// Sora for headings: wide and geometric, like the logo's wordmark.
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

// Figtree for body text: clean and easy to read at small sizes.
const figtree = Figtree({
  variable: "--font-figtree",
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
    <html lang="en-GB" className={`${sora.variable} ${figtree.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <BackToTop />
        <ScrollEffects />
      </body>
    </html>
  );
}
