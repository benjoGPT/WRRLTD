import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { site, siteUrl } from "@/config/site";
import { Header } from "@/components/Header";
import "./globals.css";

// Fonts are downloaded at build time and served from our own domain, so
// there's no request to Google when someone visits the site.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | Recruitment in ${site.locality}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
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
    <html lang="en-GB" className={`${archivo.variable} ${inter.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        {children}
      </body>
    </html>
  );
}
