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

const links = [
  {
    text: "WBO",
    href: "/",
    activeOnExact: true,
  },
  {
    text: "Bio",
    href: "/bio",
  },
  {
    text: "Work",
    href: "/work",
  },
  {
    text: "Blog",
    href: "/blog",
  },
];

export const Nav: React.FC = () => {
  const theme = useTheme();
  const app = useAppContext();
  const hasRendered = useHasRendered();

  return (
    <nav className={clsx(styles.nav, app.isUiHidden && styles.uiHidden)}>
      {links.map((link) => (
        <ActiveLink
          key={link.href}
          href={link.href}
          activeOnExact={link.activeOnExact}
          activeClassName={styles.isActive}
        >
          <a>{link.text}</a>
        </ActiveLink>
      ))}
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
