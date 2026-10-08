import { ogSize, renderOg } from "@/lib/og";

export const alt = "Frequently asked questions";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg("Frequently asked questions", "Wright Point Recruitment");
}
