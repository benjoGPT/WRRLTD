import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Building2, ChefHat, HardHat, MapPin, UserRound, Warehouse, type LucideIcon } from "lucide-react";
import { photos, type PhotoKey } from "@/lib/photos";
import styles from "./Photo.module.css";

// Line icon shown on each photo's placeholder
const placeholderIcons: Record<PhotoKey, LucideIcon> = {
  construction: HardHat,
  kitchen: ChefHat,
  warehouse: Warehouse,
  officeTeam: Building2,
  candidateChat: UserRound,
  blackpool: MapPin,
};

/**
 * A photo from src/lib/photos.ts that fills its parent box (the parent sets
 * the size and shape). If the file hasn't been downloaded yet, it shows a
 * branded placeholder instead, so the layout still looks finished.
 */
export function Photo({
  name,
  sizes,
  eager = false,
  className = "",
  showLabel = false,
}: {
  name: PhotoKey;
  sizes: string;
  eager?: boolean;
  className?: string;
  /** Hide the placeholder's label when the photo already has a caption */
  showLabel?: boolean;
}) {
  const photo = photos[name];
  const exists = fs.existsSync(path.join(process.cwd(), "public", photo.file));

  if (exists) {
    return (
      <Image
        src={photo.file}
        alt={photo.alt}
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        className={`${styles.img} ${className}`}
      />
    );
  }

  // Branded stand-in until the photo is downloaded (see scripts/fetch-photos.py)
  const Icon = placeholderIcons[name];
  return (
    <div className={`${styles.placeholder} ${className}`} role="img" aria-label={photo.alt}>
      <Icon className={styles.icon} strokeWidth={1} aria-hidden="true" />
      {showLabel && <span className={styles.label}>{photo.label}</span>}
    </div>
  );
}
