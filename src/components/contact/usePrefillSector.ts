"use client";

import { useEffect, type RefObject } from "react";
import { getSector } from "@/lib/sectors";

/**
 * If the page was opened with ?sector=<slug> (from a sector page or the route
 * finder), pre-select that sector in the form's dropdown.
 */
export function usePrefillSector(formRef: RefObject<HTMLFormElement | null>) {
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("sector");
    const sector = slug ? getSector(slug) : undefined;
    const select = formRef.current?.querySelector<HTMLSelectElement>('select[name="sector"]');
    if (sector && select) select.value = sector.name;
  }, [formRef]);
}
