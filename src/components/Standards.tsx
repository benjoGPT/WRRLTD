import { BadgeCheck, FileText, MapPinned, ShieldCheck } from "lucide-react";
import { site } from "@/config/site";
import styles from "./Standards.module.css";

/**
 * "Our standards": four commitments that give employers and candidates a
 * reason to trust a new agency. Each one is something UK recruitment law
 * already requires, so none of it is an empty promise.
 *
 * TODO: confirm with the client before launch that these processes are in place.
 */

const standards = [
  {
    icon: ShieldCheck,
    title: "Checked before every placement",
    text: "We confirm identity, right to work and references before anyone starts, plus any licences or qualifications the job needs.",
  },
  {
    icon: MapPinned,
    title: "Nationwide, not just local",
    text: `Based in ${site.locality}, recruiting across England, Scotland, Wales and Northern Ireland.`,
  },
  {
    icon: FileText,
    title: "Clear terms from the start",
    text: "Employers get our terms of business before we begin. Temporary workers get a Key Information Document before they agree to anything.",
  },
  {
    icon: BadgeCheck,
    title: "Fair to every candidate",
    text: "We never charge candidates, and we treat everyone fairly, whatever their background.",
  },
];

export function Standards() {
  return (
    <section className="section section--tint" aria-labelledby="standards-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.intro}>
          <p className="eyebrow">Our standards</p>
          <h2 id="standards-title" className="section-title">
            Recruitment done properly
          </h2>
          <p className="section-intro">
            New to us? Here&apos;s what you can expect every time, whether you&apos;re hiring or
            looking for work.
          </p>
        </div>

        <ul className={styles.grid}>
          {standards.map(({ icon: Icon, title, text }) => (
            <li key={title} className={styles.item}>
              <span className={styles.icon}>
                <Icon size={24} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.text}>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
