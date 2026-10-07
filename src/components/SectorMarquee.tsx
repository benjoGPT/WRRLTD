import { sectorNames } from "@/lib/sectors";
import styles from "./SectorMarquee.module.css";

/**
 * A slowly scrolling band of sector names under the hero. It's decorative
 * (the full sector list is further down), so screen readers skip it. The list
 * is repeated twice so the loop is seamless.
 */
export function SectorMarquee() {
  const items = [...sectorNames, ...sectorNames];
  return (
    <div className={styles.band} aria-hidden="true">
      <div className={styles.track}>
        {items.map((name, i) => (
          <span key={i} className={styles.item}>
            {name}
            <span className={styles.slash}>/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
