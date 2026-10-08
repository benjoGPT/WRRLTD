import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { founders, fullName } from "@/lib/team";
import styles from "./Founders.module.css";

/**
 * The founders. Shows a photo if one is in /public, otherwise their initial in
 * the brand style, and a marked placeholder until each founder's bio is in.
 */
export function Founders({ title = "Meet the founders", tone = "white" }: { title?: string; tone?: "white" | "paper" }) {
  return (
    <section className={`section ${styles[tone]}`} aria-labelledby="founders-title">
      <div className={`container ${styles.layout}`}>
        <div>
          <h2 id="founders-title" className="section-title">
            {title}
          </h2>
          <p className="section-intro">
            Wright Point was started by Anthony and Tanya. When you get in touch, you deal with
            them directly.
          </p>
        </div>

        <ul className={styles.list}>
          {founders.map((f) => {
            const hasPhoto = f.photo && fs.existsSync(path.join(process.cwd(), "public", f.photo));
            return (
              <li key={f.firstName} className={styles.person}>
                <div className={styles.portrait}>
                  {hasPhoto ? (
                    <Image src={f.photo!} alt={fullName(f)} fill sizes="(min-width: 768px) 280px, 45vw" />
                  ) : (
                    <span className={styles.initial} aria-hidden="true">
                      {f.firstName[0]}
                    </span>
                  )}
                </div>
                <h3 className={styles.name}>{fullName(f)}</h3>
                <p className={styles.role}>{f.role}</p>
                {f.bio ? (
                  <p className={styles.bio}>{f.bio}</p>
                ) : (
                  // TODO: replace with the founder's own bio (see src/lib/team.ts)
                  <p className={`${styles.bio} ${styles.pending}`}>
                    Bio to follow: {f.firstName}&apos;s background, experience and why they started
                    Wright Point.
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
