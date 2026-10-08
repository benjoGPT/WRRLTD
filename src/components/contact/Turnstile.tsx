"use client";

import { useEffect, useRef } from "react";
import { site } from "@/config/site";

/**
 * Cloudflare Turnstile, the bot check on the forms. It runs in the background
 * and only appears (as a tick box) if Cloudflare wants the visitor to confirm
 * they're human. It adds a hidden "cf-turnstile-response" field to the form,
 * which /api/contact checks with Cloudflare.
 *
 * Renders nothing until a site key is set in src/config/site.ts.
 */

type TurnstileApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
/** Sent to the form by useContactForm after a failed send: tokens work once */
export const TURNSTILE_RESET_EVENT = "wpr:turnstile-reset";

let scriptLoading: Promise<void> | null = null;

function loadScript() {
  if (window.turnstile) return Promise.resolve();
  scriptLoading ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptLoading = null;
      reject(new Error("Turnstile failed to load"));
    };
    document.head.appendChild(script);
  });
  return scriptLoading;
}

export function Turnstile() {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!site.turnstileSiteKey || !box) return;
    let widgetId: string | null = null;
    let cancelled = false;
    const form = box.closest("form");
    const reset = () => widgetId && window.turnstile?.reset(widgetId);

    loadScript()
      .then(() => {
        if (cancelled || !window.turnstile) return;
        widgetId = window.turnstile.render(box, {
          sitekey: site.turnstileSiteKey,
          theme: "light",
          size: "flexible",
          // Only takes up space if the visitor actually needs to tick the box
          appearance: "interaction-only",
          language: "en-GB",
        });
        form?.addEventListener(TURNSTILE_RESET_EVENT, reset);
      })
      // If it can't load (e.g. blocked by an extension), the server decides.
      .catch(() => {});

    return () => {
      cancelled = true;
      form?.removeEventListener(TURNSTILE_RESET_EVENT, reset);
      if (widgetId) window.turnstile?.remove(widgetId);
    };
  }, []);

  if (!site.turnstileSiteKey) return null;
  return <div ref={boxRef} />;
}

/**
 * Waits briefly for the background check to finish, so someone who fills in
 * the form very quickly isn't turned away. Resolves either way.
 */
export async function waitForTurnstile(form: HTMLFormElement, timeoutMs = 6000) {
  if (!site.turnstileSiteKey) return;
  const field = () => form.querySelector<HTMLInputElement>('input[name="cf-turnstile-response"]');
  const start = Date.now();
  while (!field()?.value && Date.now() - start < timeoutMs) {
    await new Promise((r) => setTimeout(r, 200));
  }
}
