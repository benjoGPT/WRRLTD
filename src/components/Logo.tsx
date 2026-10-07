import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { site } from "@/config/site";
import styles from "./Logo.module.css";

/**
 * The logo. Uses /public/logo.png once it's been added; until then it shows a
 * simple text version so the layout can be built and tested.
 *
 * The real logo is dark artwork, so on navy sections pass `inverted` and a CSS
 * filter turns it white.
 */

// Checked once when the site is built (the pages are static).
const hasLogoFile = fs.existsSync(path.join(process.cwd(), "public", "logo.png"));

type LogoProps = {
  inverted?: boolean;
  className?: string;
  priority?: boolean;
};

export function Logo({ inverted = false, className = "", priority = false }: LogoProps) {
  const classes = [styles.logo, inverted ? styles.inverted : "", className].join(" ");

  if (hasLogoFile) {
    return (
      <Image
        src="/logo.png"
        alt={site.name}
        width={1536}
        height={1024}
        priority={priority}
        className={classes}
        sizes="200px"
      />
    );
  }

  // Placeholder: delete once logo.png is in /public (it switches automatically).
  return (
    <span className={`${classes} ${styles.placeholder}`}>
      <span className={styles.mark} aria-hidden="true">
        WP
      </span>
      <span className={styles.words}>
        Wright Point
        <span className={styles.sub}>Recruitment</span>
      </span>
    </span>
  );
}
