import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";

/**
 * The preview image shown when the site is shared on social media or in
 * messages. Generated once at build time.
 * The logo is a white version made by brand/make-logos.py.
 */
export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The site's heading font, so the image matches the website.
const fontDir = join(process.cwd(), "node_modules/@fontsource/archivo/files");

export default async function OpengraphImage() {
  const [semiBold, extraBold, logo] = await Promise.all([
    readFile(join(fontDir, "archivo-latin-600-normal.woff")),
    readFile(join(fontDir, "archivo-latin-800-normal.woff")),
    readFile(join(process.cwd(), "src/assets/logo-horizontal-white.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#07284b",
          color: "#ffffff",
          fontFamily: "Archivo",
          position: "relative",
        }}
      >
        {/* Slanted panels, as in the hero */}
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 520, display: "flex" }}>
          <svg width="520" height="630" viewBox="0 0 520 630">
            <path d="M190 0H520V630H20Z" fill="#0b3866" />
            <path d="M340 0H520V630H170Z" fill="#0f4478" />
            <path d="M460 0H520V630H290Z" fill="#727c88" fillOpacity="0.3" />
          </svg>
        </div>
        <img src={logoSrc} width={507} height={60} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05, maxWidth: 760 }}>
            {site.tagline}
          </div>
          <div style={{ fontSize: 32, fontWeight: 600, color: "#b8c2ce" }}>
            {`Permanent & temporary recruitment · ${site.locality}`}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: semiBold, weight: 600, style: "normal" },
        { name: "Archivo", data: extraBold, weight: 800, style: "normal" },
      ],
    },
  );
}
