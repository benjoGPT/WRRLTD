"use client";

import { useEffect, useRef } from "react";

/**
 * A soft glow that follows the mouse across its parent (desktop only).
 * It just sets two CSS variables; the parent's CSS draws the glow.
 */
export function Spotlight() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      const box = parent.getBoundingClientRect();
      parent.style.setProperty("--mx", `${e.clientX - box.left}px`);
      parent.style.setProperty("--my", `${e.clientY - box.top}px`);
    };
    parent.addEventListener("pointermove", move);
    return () => parent.removeEventListener("pointermove", move);
  }, []);

  return <span ref={ref} hidden />;
}
