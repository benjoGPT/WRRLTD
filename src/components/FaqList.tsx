import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/faqs";
import styles from "./FaqList.module.css";

/**
 * Questions and answers using the browser's built-in <details>, so they open
 * and close with no JavaScript and work with a keyboard.
 */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <details key={item.q} className={styles.item}>
          <summary className={styles.question}>
            <span>{item.q}</span>
            <ChevronDown size={22} className={styles.chevron} aria-hidden="true" />
          </summary>
          <p className={styles.answer}>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
