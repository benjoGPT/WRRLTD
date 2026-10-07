import styles from "./HowItWorks.module.css";

/**
 * Four steps for employers and four for candidates, side by side on larger
 * screens and stacked on phones.
 *
 * TODO: ask the client to confirm these steps match how they actually work.
 */

const journeys = [
  {
    id: "employer-steps",
    title: "For employers",
    steps: [
      {
        title: "Tell us what you need",
        text: "Call us or send the form with the role, the hours and whether it's permanent or temporary.",
      },
      {
        title: "We get to know the role",
        text: "We ask about the job, your business and what the right person looks like for you.",
      },
      {
        title: "We introduce suitable candidates",
        text: "You only hear about people we believe fit the role and your team.",
      },
      {
        title: "You make the choice",
        text: "We arrange interviews or start dates and stay in touch once they've started.",
      },
    ],
  },
  {
    id: "candidate-steps",
    title: "For candidates",
    steps: [
      {
        title: "Send us your CV",
        text: "Use the form below or email it to us. No CV? Get in touch and we'll help.",
      },
      {
        title: "We have a chat",
        text: "We talk about your experience, the work you want and when you're available.",
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
  return (
    <section id="how-it-works" className="section" aria-labelledby="how-title">
      <div className="container">
        <p className="eyebrow">How it works</p>
        <h2 id="how-title" className="section-title">
          A simple process, start to finish
        </h2>

        <div className={styles.columns}>
          {journeys.map((journey) => (
            <div key={journey.id} className={styles.journey}>
              <h3 id={journey.id} className={styles.journeyTitle}>
                {journey.title}
              </h3>
              <ol className={styles.steps} aria-labelledby={journey.id}>
                {journey.steps.map((step, i) => (
                  <li key={step.title} className={styles.step}>
                    <span className={styles.number} aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h4 className={styles.stepTitle}>{step.title}</h4>
                      <p className={styles.stepText}>{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
