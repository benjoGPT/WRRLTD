import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CheckCircle2 } from "lucide-react";
import { site } from "@/config/site";
import styles from "@/components/Prose.module.css";
import { ThankYouMessage } from "./ThankYouMessage";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Thanks for getting in touch.",
  // Never list this page in search results, even after launch.
  robots: { index: false, follow: false },
};

/** Shown after either form has been sent successfully. */
export default function ThankYouPage() {
  return (
    <main id="main" className={`container ${styles.page}`}>
      <div className={styles.prose}>
        <CheckCircle2 size={48} color="#067647" aria-hidden="true" style={{ marginBottom: 16 }} />
        <h1>Thank you</h1>
        {/* Suspense shows the general message until the page knows which form was sent. */}
        <Suspense fallback={<p>We&apos;ve got your message and we&apos;ll be in touch.</p>}>
          <ThankYouMessage />
        </Suspense>
        {/* TODO: confirm the response time with the client (also in the FAQ). */}
        <p>
          We aim to reply within one working day. If it&apos;s urgent, call us on{" "}
          <a href={site.phoneHref}>{site.phone}</a>.
        </p>
        <div className={styles.actions}>
          <Link href="/" className="btn">
            Back to the home page
          </Link>
          <Link href="/#sectors" className="btn btn--outline">
            See the sectors we cover
          </Link>
        </div>
      </div>
    </main>
  );
}
