import type { Step } from "@/lib/journeys";
import styles from "./StepList.module.css";

/** Numbered steps. The numbers are honest here: it's a real sequence. */
export function StepList({ steps }: { steps: Step[] }) {
  return (
    <ol className={styles.steps}>
      {steps.map((step) => (
        <li key={step.title}>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
