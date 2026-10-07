"use client";

import { useEffect, useState } from "react";
import styles from "./RotatingWord.module.css";

/**
 * Cycles through a list of words with a slide-up animation. Screen readers get
 * a plain sentence instead (passed as `srText`), so they aren't interrupted
 * every few seconds. Stops on the first word if the visitor prefers less motion.
 */
export function RotatingWord({ words, srText }: { words: string[]; srText: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % words.length), 2400);
    return () => window.clearInterval(timer);
  }, [words.length]);

  return (
    <>
      <span className="sr-only">{srText}</span>
      <span className={styles.window} aria-hidden="true">
        {/* key change remounts the span, which replays the slide-in animation */}
        <span key={index} className={styles.word}>
          {words[index]}
        </span>
      </span>
    </>
  );
}
