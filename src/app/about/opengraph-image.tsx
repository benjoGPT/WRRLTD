import { ogSize, renderOg } from "@/lib/og";

export const alt = "About Wright Point Recruitment";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg("About Wright Point Recruitment", "Based in Blackpool, recruiting across the UK");
}
