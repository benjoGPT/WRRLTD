import { site } from "@/config/site";
import styles from "./Standards.module.css";

/**
 * What employers and candidates can expect every time. Each line is something
 * UK recruitment law already requires, so none of it is an empty promise.
 *
 * TODO: confirm with the client before launch that these processes are in place.
 */

const standards = [
  {
    title: "Checked before every placement",
    text: "We confirm identity, right to work and references before anyone starts, plus any licence or qualification the job needs.",
  },
  {
    title: "Nationwide",
    text: `Based in ${site.locality}, recruiting in England, Scotland, Wales and Northern Ireland.`,
  },
  {
    title: "Clear terms before we start",
    text: "Employers get our terms of business up front. Temporary workers get a Key Information Document before they agree to anything.",
  },
  {
    title: "Free for candidates",
    text: "We never charge you for finding you work, and we treat every applicant fairly.",
  },
];

export function Standards() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="standards-title">
      <div className={`container ${styles.layout}`}>
        <h2 id="standards-title" className={styles.statement}>
          Recruitment done properly, for both sides.
        </h2>

        <dl className={styles.list}>
          {standards.map((s) => (
            <div key={s.title} className={styles.item}>
              <dt>{s.title}</dt>
              <dd>{s.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
