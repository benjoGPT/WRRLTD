"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Building2, UserRound } from "lucide-react";
import styles from "./HowItWorks.module.css";

/**
 * Four steps for employers and four for candidates, switched with tabs.
 * Follows the standard accessible tabs pattern: arrow keys move between tabs.
 *
 * TODO: ask the client to confirm these steps match how they actually work.
 */

const journeys = [
  {
    id: "employers",
    tab: "For employers",
    icon: Building2,
    steps: [
      {
        title: "Tell us what you need",
        text: "Call us or fill in the form: the role, the hours, the location and whether it's permanent or temporary.",
      },
      {
        title: "We find the people",
        text: "We advertise on our website, social media and job sites, and search the candidates already registered with us.",
      },
      {
        title: "You meet a shortlist",
        text: "We check each candidate first, so you only spend time on people who fit the role.",
      },
      {
        title: "You make the choice",
        text: "We arrange interviews or start dates and stay in touch once they've started.",
      },
    ],
  },
  {
    id: "candidates",
    tab: "For candidates",
    icon: UserRound,
    steps: [
      {
        title: "Apply online",
        text: "Fill in the short form and attach your CV. No CV yet? Call or email us and we'll help.",
      },
      {
        title: "We give you a call",
        text: "We talk through your experience, the work you want, where you can travel and when you're free.",
      },
      {
        title: "We match you to roles",
        text: "We put you forward only for jobs that suit you, and always with your say-so.",
      },
      {
        title: "Start your new role",
        text: "We help you prepare for interviews and keep in touch after you start.",
      },
    ],
  },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = (active + (e.key === "ArrowRight" ? 1 : -1) + journeys.length) % journeys.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const journey = journeys[active];

  return (
    <section id="how-it-works" className="section" aria-labelledby="how-title">
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className="eyebrow">How it works</p>
            <h2 id="how-title" className="section-title">
              A simple process, start to finish
            </h2>
          </div>

          <div className={styles.tabs} role="tablist" aria-label="Choose a process" onKeyDown={onKeyDown}>
            {journeys.map((j, i) => (
              <button
                key={j.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${j.id}`}
                aria-selected={active === i}
                aria-controls={`panel-${j.id}`}
                tabIndex={active === i ? 0 : -1}
                className={styles.tab}
                onClick={() => setActive(i)}
              >
                <j.icon size={18} aria-hidden="true" />
                {j.tab}
              </button>
            ))}
            {/* Sliding highlight behind the selected tab */}
            <span className={styles.slider} style={{ transform: `translateX(${active * 100}%)` }} aria-hidden="true" />
          </div>
        </div>

        <div role="tabpanel" id={`panel-${journey.id}`} aria-labelledby={`tab-${journey.id}`}>
          {/* key makes the list re-render, replaying the staggered animation */}
          <ol key={journey.id} className={styles.steps}>
            {journey.steps.map((step, i) => (
              <li key={step.title} className={styles.step} style={{ animationDelay: `${i * 80}ms` }}>
                <span className={styles.number} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
