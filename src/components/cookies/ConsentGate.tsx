"use client";

import { useEffect, useState, type ReactNode } from "react";
import { CONSENT_EVENT, readConsent, type ConsentCategory } from "@/lib/consent";

/**
 * Only renders its children once the visitor has agreed to that category of
 * cookies. Wrap any future analytics or marketing script in this, e.g.
 *
 *   <ConsentGate category="analytics"><AnalyticsScript /></ConsentGate>
 */
export function ConsentGate({ category, children }: { category: ConsentCategory; children: ReactNode }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const check = () => setAllowed(readConsent()?.[category] === true);
    check();
    window.addEventListener(CONSENT_EVENT, check);
    return () => window.removeEventListener(CONSENT_EVENT, check);
  }, [category]);

  return allowed ? <>{children}</> : null;
}
