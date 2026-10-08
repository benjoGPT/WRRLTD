import { getGuide, guides } from "@/lib/guides";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "Guide";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  return renderOg(guide?.title ?? "Guide", `A guide for ${guide?.audience.toLowerCase() ?? "you"}`);
}
