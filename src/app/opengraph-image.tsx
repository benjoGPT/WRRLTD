import { site } from "@/config/site";
import { ogSize, renderOg } from "@/lib/og";

// Share image for the home page (and any page without its own).
export const alt = `${site.name}: ${site.tagline}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg(site.tagline, `Permanent & temporary recruitment across ${site.coverage}`);
}
