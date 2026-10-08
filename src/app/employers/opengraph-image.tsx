import { ogSize, renderOg } from "@/lib/og";

export const alt = "Staff you can rely on";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg("Staff you can rely on", "Recruitment for employers across the UK");
}
