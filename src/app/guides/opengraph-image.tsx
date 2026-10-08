import { ogSize, renderOg } from "@/lib/og";

export const alt = "Guides for candidates and employers";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg("Guides", "CVs, hiring temporary staff and right to work checks");
}
