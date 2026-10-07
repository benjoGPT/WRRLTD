"use client";

import { useRef, type ReactNode } from "react";
import { Mail, Menu, Phone, X } from "lucide-react";
import { site } from "@/config/site";
import { cvLink, navLinks } from "@/lib/nav";
import styles from "./MobileMenu.module.css";

/**
 * The menu button and full-screen menu for phones and tablets.
 *
 * It uses the browser's built-in <dialog> element, which gives us a lot for
 * free: Escape closes it, keyboard focus stays inside while it's open, and the
 * page behind can't be clicked or reached with Tab.
 */
export function MobileMenu({ logo }: { logo: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        className={styles.toggle}
        onClick={open}
        aria-haspopup="dialog"
      >
        <Menu size={24} aria-hidden="true" />
        <span className="sr-only">Open menu</span>
      </button>

      <dialog ref={dialogRef} className={`${styles.dialog} on-dark`} aria-label="Menu">
        <div className={styles.top}>
          <span className={styles.logo}>{logo}</span>
          <button type="button" className={styles.close} onClick={close} autoFocus>
            <X size={28} aria-hidden="true" />
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        <nav aria-label="Main">
          <ul className={styles.list}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.link} onClick={close}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.footer}>
          <a href={cvLink} className="btn btn--light btn--block" onClick={close}>
            Send your CV
          </a>
          <a href={site.phoneHref} className={styles.contact}>
            <Phone size={18} aria-hidden="true" />
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className={styles.contact}>
            <Mail size={18} aria-hidden="true" />
            {site.email}
          </a>
        </div>
      </dialog>
    </>
  );
}
