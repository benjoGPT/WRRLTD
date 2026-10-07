"use client";

import { useSearchParams } from "next/navigation";

/**
 * The line that changes depending on which form was sent. It reads
 * ?from=employer or ?from=candidate from the address bar.
 */
export function ThankYouMessage() {
  const from = useSearchParams().get("from");

  if (from === "employer") {
    return <p>We&apos;ve got the details of your vacancy and we&apos;ll be in touch to talk it through.</p>;
  }
  if (from === "candidate") {
    return <p>We&apos;ve got your CV and we&apos;ll be in touch to talk about the work you&apos;re looking for.</p>;
  }
  return <p>We&apos;ve got your message and we&apos;ll be in touch.</p>;
}
