"use client";

import { useEffect } from "react";

/**
 * Marks the page as "scrolled" so the header can show a soft shadow once the
 * visitor moves down the page. (Section fade-ins were removed on purpose: a
 * fade on every section reads as templated.)
 */
export function ScrollEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const onScroll = () => root.toggleAttribute("data-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
