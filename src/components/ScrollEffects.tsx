"use client";

import { useEffect } from "react";

/**
 * Small page-wide scroll effects, all from one place:
 * - sections fade up as they come into view (only things below the fold,
 *   so nothing on the first screen ever flickers)
 * - marks the page as "scrolled" so the header can show a shadow
 *
 * Skips the fade entirely for visitors who prefer less motion.
 */
export function ScrollEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const onScroll = () => root.toggleAttribute("data-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    let observer: IntersectionObserver | undefined;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -10% 0px" },
      );
      document.querySelectorAll("main .section .container > *").forEach((el) => {
        if (el.getBoundingClientRect().top > window.innerHeight) {
          el.classList.add("reveal");
          observer?.observe(el);
        }
      });
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  return null;
}
