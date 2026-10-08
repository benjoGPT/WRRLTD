import { ogSize, renderOg } from "@/lib/og";

export const alt = "Sectors we recruit for";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg("Sectors we recruit for", "Twelve sectors, permanent and temporary roles");
}
