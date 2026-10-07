import Image from "next/image";
import { site } from "@/config/site";
import styles from "./Logo.module.css";

/**
 * The logo, in two layouts made from the client's artwork by
 * brand/make-logos.py:
 *
 * - "horizontal": WP mark beside the name, for the header and menu
 * - "stacked":    the original layout, mark above the name, for the footer
 *
 * The artwork is dark, so on navy backgrounds pass `inverted`, which turns it
 * white with a CSS filter. Its height is set by whoever uses it (CSS on the
 * parent); the width follows automatically.
 */

const files = {
  horizontal: { src: "/logo-horizontal.png", width: 1916, height: 227 },
  stacked: { src: "/logo.png", width: 1305, height: 629 },
};

type LogoProps = {
  variant?: keyof typeof files;
  inverted?: boolean;
  /** Load straight away (for the header) instead of when scrolled into view. */
  eager?: boolean;
};

export function Logo({ variant = "horizontal", inverted = false, eager = false }: LogoProps) {
  const file = files[variant];
  return (
    <Image
      src={file.src}
      alt={site.name}
      width={file.width}
      height={file.height}
      loading={eager ? "eager" : "lazy"}
      sizes={variant === "horizontal" ? "(min-width: 1280px) 380px, 300px" : "220px"}
      className={`${styles.logo} ${inverted ? styles.inverted : ""}`}
    />
  );
}
