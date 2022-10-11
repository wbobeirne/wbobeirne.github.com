import clsx from "clsx";
import React from "react";
import { useAppContext } from "../../contexts/app";
import { useTheme } from "../../contexts/theme";
import ActiveLink from "../ActiveLink";
import SunIcon from "../../public/icons/sun.svg";
import MoonIcon from "../../public/icons/moon.svg";
import CameraIcon from "../../public/icons/camera.svg";
import styles from "./style.module.scss";
import { useHasRendered } from "../../util/hooks";

export const Nav: React.FC = () => {
  const theme = useTheme();
  const app = useAppContext();
  const hasRendered = useHasRendered();

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
      {hasRendered && (
        <div className={styles.buttons}>
          <button onClick={() => app.toggleUi()}>
            <CameraIcon />
          </button>
          <button
            className={styles.themeToggle}
            onClick={() => theme.toggleMode()}
          >
            {theme.mode === "light" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      )}
    </nav>
  );
};
