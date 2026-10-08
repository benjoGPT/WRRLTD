import Link from "next/link";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { TopBar } from "./TopBar";
import { cvLink } from "@/lib/nav";
import { NavLinks } from "./NavLinks";
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
            <Logo eager />
          </Link>

          <nav className={styles.nav} aria-label="Main">
            <NavLinks listClassName={styles.navList} linkClassName={styles.navLink} />
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
