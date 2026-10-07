"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Building2, Check, UserRound } from "lucide-react";
import { sectors } from "@/lib/sectors";
import { openForm, type FormKind } from "@/lib/openForm";
import styles from "./RouteFinder.module.css";

/**
 * "Two quick questions": pick hiring or looking for work, then a sector, and
 * we open the right form with the sector already filled in.
 */
export function RouteFinder() {
  const [kind, setKind] = useState<FormKind | null>(null);
  const [sector, setSector] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const step = !kind ? 1 : !sector ? 2 : 3;

  // Move focus to the new question so keyboard and screen reader users follow along
  const go = (fn: () => void) => {
    fn();
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const questions = {
    1: "What brings you here?",
    2: kind === "employer" ? "Which sector are you hiring in?" : "Which sector do you want to work in?",
    3: "Great, here's your next step",
  } as const;

  return (
    <section className={`section ${styles.section}`} aria-labelledby="finder-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.intro}>
          <p className="eyebrow">Find your route</p>
          <h2 id="finder-title" className="section-title">
            Two quick questions
          </h2>
          <p className="section-intro">
            Tell us what you need and we&apos;ll take you straight to the right form, already
            filled in.
          </p>
        </div>

        <div className={styles.card}>
          {/* Progress: three slanted segments */}
          <ol className={styles.progress} aria-label={`Step ${step} of 3`}>
            {[1, 2, 3].map((n) => (
              <li key={n} className={n <= step ? styles.done : ""} aria-hidden="true" />
            ))}
          </ol>

          <h3 ref={headingRef} tabIndex={-1} className={styles.question} aria-live="polite">
            <span className={styles.stepNo}>0{step}</span>
            {questions[step]}
          </h3>

          {step === 1 && (
            <div className={styles.choices}>
              <button type="button" className={styles.bigChoice} onClick={() => go(() => setKind("employer"))}>
                <Building2 size={28} aria-hidden="true" />
                <span>
                  <strong>I&apos;m hiring</strong>
                  <small>Find staff for my business</small>
                </span>
                <ArrowRight size={20} aria-hidden="true" className={styles.arrow} />
              </button>
              <button type="button" className={styles.bigChoice} onClick={() => go(() => setKind("candidate"))}>
                <UserRound size={28} aria-hidden="true" />
                <span>
                  <strong>I&apos;m looking for work</strong>
                  <small>Find my next role</small>
                </span>
                <ArrowRight size={20} aria-hidden="true" className={styles.arrow} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className={styles.chips}>
              {sectors.map(({ name, slug, icon: Icon }) => (
                <button key={slug} type="button" className={styles.chip} onClick={() => go(() => setSector(name))}>
                  <Icon size={18} aria-hidden="true" />
                  {name}
                </button>
              ))}
              <button type="button" className={styles.chip} onClick={() => go(() => setSector("Other / not sure"))}>
                Not sure yet
              </button>
            </div>
          )}

          {step === 3 && kind && sector && (
            <div className={styles.result}>
              <p className={styles.summary}>
                <Check size={20} aria-hidden="true" />
                {kind === "employer" ? "You're hiring" : "You're looking for work"}
                {sector !== "Other / not sure" && (
                  <>
                    {" "}
                    in <strong>{sector}</strong>
                  </>
                )}
                .
              </p>
              <p className={styles.resultText}>
                {kind === "employer"
                  ? "Tell us about the role and we'll start looking for the right people."
                  : "Send us your CV and we'll be in touch about suitable roles."}
              </p>
              <button type="button" className="btn" onClick={() => openForm(kind, sector)}>
                {kind === "employer" ? "Continue to the employer form" : "Continue to send your CV"}
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          )}

          {step > 1 && (
            <button
              type="button"
              className={styles.back}
              onClick={() => go(() => (step === 3 ? setSector(null) : setKind(null)))}
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
