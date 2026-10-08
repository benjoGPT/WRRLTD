"use client";

import { useState } from "react";
import styles from "./Photo.module.css";

/**
 * Loads a photo straight from Unsplash in the visitor's browser. If it fails
 * (offline, blocked), it hides itself so the branded placeholder underneath
 * shows instead of a broken-image icon.
 */
export function RemotePhoto({ src, srcSet, sizes, alt, eager }: {
  src: string;
  srcSet: string;
  sizes: string;
  alt: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    // A plain <img>: the remote file is already sized by Unsplash, and
    // next/image's optimiser would need server access to Unsplash.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={styles.img}
      onError={() => setFailed(true)}
    />
  );
}
