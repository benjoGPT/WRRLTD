import { ogSize, renderOg } from "@/lib/og";

export const alt = "Work that suits you";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg("Work that suits you", "Permanent and temporary jobs. Always free.");
}
