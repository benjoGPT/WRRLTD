import type { ReactNode } from "react";
import styles from "./SplitSection.module.css";

/**
 * The site's standard section: heading and intro on one half, content on the
 * other (stacked on phones). Tone sets the background.
 */
export function SplitSection({
  id,
  title,
  intro,
  tone = "white",
  children,
}: {
  id?: string;
  title: string;
  intro?: ReactNode;
  tone?: "white" | "paper" | "navy";
  children: ReactNode;
}) {
  const headingId = `${id ?? title.toLowerCase().replace(/[^a-z]+/g, "-")}-title`;
  return (
    <section
      id={id}
      className={`section ${styles[tone]} ${tone === "navy" ? "on-dark" : ""}`}
      aria-labelledby={headingId}
    >
      <div className={`container ${styles.layout}`}>
        <div className={styles.head}>
          <h2 id={headingId} className="section-title">
            {title}
          </h2>
          {intro && <div className="section-intro">{intro}</div>}
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </section>
  );
}
