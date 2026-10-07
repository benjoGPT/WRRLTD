import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Camera } from "lucide-react";
import { photos, type PhotoKey } from "@/lib/photos";
import styles from "./Photo.module.css";

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
  showLabel = true,
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

  // Placeholder until the photo is downloaded (see scripts/fetch-photos.py)
  return (
    <div className={`${styles.placeholder} ${className}`} role="img" aria-label={photo.alt}>
      <Camera size={28} strokeWidth={1.5} aria-hidden="true" />
      {showLabel && <span>{photo.label}</span>}
    </div>
  );
}
