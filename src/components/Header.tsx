import Link from "next/link";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { TopBar } from "./TopBar";
import { cvLink, navLinks } from "@/lib/nav";
import styles from "./Header.module.css";

/**
 * Site header: the top bar, then a sticky bar with the logo, navigation and
 * "Send your CV" button. Below 1024px the links move into the full-screen
 * menu opened by the menu button.
 */
export function Header() {
  return (
    <>
      <TopBar />
      <header className={styles.header}>
        <div className={`container ${styles.inner}`}>
          <Link href="/" className={styles.logoLink}>
            <Logo priority />
          </Link>

          <nav className={styles.nav} aria-label="Main">
            <ul className={styles.navList}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={styles.navLink}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <a href={cvLink} className={`btn ${styles.cv}`}>
              Send your CV
            </a>
            <MobileMenu logo={<Logo inverted />} />
          </div>
        </div>
      </header>
    </>
  );
}
