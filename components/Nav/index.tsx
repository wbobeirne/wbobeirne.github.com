import clsx from "clsx";
import React from "react";
import { useAppContext } from "../../contexts/app";
import { useTheme } from "../../contexts/theme";
import ActiveLink from "../ActiveLink";
import styles from "./style.module.scss";

export const Nav: React.FC = () => {
  const theme = useTheme();
  const app = useAppContext();

  return (
    <nav className={clsx(styles.nav, app.isUiHidden && styles.uiHidden)}>
      <ActiveLink href="/" activeOnExact activeClassName={styles.isActive}>
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
      <div className={styles.buttons}>
        <button onClick={() => app.toggleUi()}>Toggle UI</button>
        <button
          className={styles.themeToggle}
          onClick={() => theme.toggleMode()}
        >
          Toggle theme
        </button>
      </div>
    </nav>
  );
};
