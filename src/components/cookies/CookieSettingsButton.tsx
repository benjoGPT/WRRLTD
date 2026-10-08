"use client";

import { openCookieSettings } from "@/lib/consent";

/** "Cookie settings" link for the footer: reopens the preferences panel. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={openCookieSettings}>
      Cookie settings
    </button>
  );
}
