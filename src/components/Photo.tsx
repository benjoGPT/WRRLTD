import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import {
  Building2,
  ChefHat,
  Factory,
  HardHat,
  Mail,
  MapPin,
  Route,
  Shovel,
  Truck,
  UserRound,
  Warehouse,
  Wrench,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";
import { photos, unsplashUrl, type PhotoKey } from "@/lib/photos";
import { RemotePhoto } from "./RemotePhoto";
import styles from "./Photo.module.css";

// Line icon on each photo's placeholder
const placeholderIcons: Record<PhotoKey, LucideIcon> = {
  construction: HardHat,
  siteWorker: Shovel,
  tradesman: Wrench,
  factory: Factory,
  kitchen: ChefHat,
  warehouse: Warehouse,
  trucks: Truck,
  port: Route,
  reception: ClipboardList,
  officeTeam: Building2,
  candidateChat: UserRound,
  meeting: Mail,
  blackpool: MapPin,
};

/**
 * A photo from src/lib/photos.ts that fills its parent box (the parent sets
 * the size and shape). Uses the local file in /public/images if it's been
 * downloaded, otherwise loads it from Unsplash, with a branded placeholder
 * underneath in case that fails.
 */
export function Photo({
  name,
  sizes,
  eager = false,
}: {
  name: PhotoKey;
  sizes: string;
  eager?: boolean;
}) {
  const photo = photos[name];
  const local = fs.existsSync(path.join(process.cwd(), "public", photo.file));
  const Icon = placeholderIcons[name];

  return (
    <>
      <div className={styles.placeholder} aria-hidden="true">
        <Icon className={styles.icon} strokeWidth={1} />
      </div>
      {local ? (
        <Image
          src={photo.file}
          alt={photo.alt}
          fill
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          className={styles.img}
        />
      ) : (
        <RemotePhoto
          src={unsplashUrl(photo.unsplashId, 1200)}
          srcSet={[640, 1200, 1920].map((w) => `${unsplashUrl(photo.unsplashId, w)} ${w}w`).join(", ")}
          sizes={sizes}
          alt={photo.alt}
          eager={eager}
        />
      )}
    </>
  );
}
