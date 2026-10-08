import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * Draws the preview image shown when a page is shared on social media or in
 * messages: navy background, white logo, the page's title and a subtitle.
 * Each page's opengraph-image.tsx calls this with its own words.
 */

export const ogSize = { width: 1200, height: 630 };

const fontDir = join(process.cwd(), "node_modules/@fontsource/sora/files");

export async function renderOg(title: string, subtitle: string) {
  const [semiBold, extraBold, logo] = await Promise.all([
    readFile(join(fontDir, "sora-latin-600-normal.woff")),
    readFile(join(fontDir, "sora-latin-800-normal.woff")),
    readFile(join(process.cwd(), "src/assets/logo-horizontal-white.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  // Long titles get a smaller size so they stay within three lines
  const titleSize = title.length > 34 ? 64 : 80;

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
          fontFamily: "Sora",
          position: "relative",
        }}
      >
        {/* The slanted seam from the site's hero */}
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 420, display: "flex" }}>
          <svg width="420" height="630" viewBox="0 0 420 630">
            <path d="M160 0H420V630H30Z" fill="#f6f8fa" />
          </svg>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain img */}
        <img src={logoSrc} width={507} height={60} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 760 }}>
          <div style={{ fontSize: titleSize, fontWeight: 800, lineHeight: 1.04, letterSpacing: -2 }}>{title}</div>
          <div style={{ fontSize: 30, fontWeight: 600, color: "#c9d1da" }}>{subtitle}</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Sora", data: semiBold, weight: 600, style: "normal" },
        { name: "Sora", data: extraBold, weight: 800, style: "normal" },
      ],
    },
  );
}
