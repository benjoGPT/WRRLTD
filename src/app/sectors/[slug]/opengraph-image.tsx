import { ogSize, renderOg } from "@/lib/og";
import { getSector, sectors } from "@/lib/sectors";

export const alt = "Sector recruitment";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sector = getSector(slug);
  return renderOg(
    `${sector?.name ?? "Sector"} recruitment`,
    "Permanent & temporary roles across the UK",
  );
}
