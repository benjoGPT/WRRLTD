import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * Browser tab icon (favicon), drawn as a navy "WP" square.
 * TODO: replace with a crop of the WP mark from the real logo once
 * /public/logo.png is added (save it as src/app/icon.png and delete this file).
 */
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const font = await readFile(
    join(process.cwd(), "node_modules/@fontsource/archivo/files/archivo-latin-800-normal.woff"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#07284b",
          color: "#ffffff",
          fontSize: 30,
          fontWeight: 800,
          fontFamily: "Archivo",
        }}
      >
        WP
      </div>
    ),
    { ...size, fonts: [{ name: "Archivo", data: font, weight: 800, style: "normal" }] },
  );
}
