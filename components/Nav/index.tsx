import React from "react";
import { useTheme } from "../../contexts/theme";
import ActiveLink from "../ActiveLink";
import styles from "./style.module.scss";

export const Nav: React.FC = () => {
  const theme = useTheme();

  return (
    <nav className={styles.nav}>
      <ActiveLink href="/" activeClassName={styles.isActive}>
        <a>WBO</a>
      </ActiveLink>
      <ActiveLink href="/bio" activeClassName={styles.isActive}>
        <a>Bio</a>
      </ActiveLink>
      <ActiveLink href="/work" activeClassName={styles.isActive}>
        <a>Work</a>
      </ActiveLink>
      <ActiveLink href="/blog" activeClassName={styles.isActive}>
        <a>Blog</a>
      </ActiveLink>
      <button className={styles.themeToggle} onClick={() => theme.toggleMode()}>
        Toggle theme
      </button>
    </nav>
  );
};
