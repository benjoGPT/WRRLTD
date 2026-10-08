import { ogSize, renderOg } from "@/lib/og";

export const alt = "Contact us";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg("Contact us", "Send your CV or tell us about a vacancy");
}
