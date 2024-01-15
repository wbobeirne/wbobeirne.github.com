import clsx from "clsx";
import React from "react";
import { useAppContext } from "../../contexts/app";
import { useTheme } from "../../contexts/theme";
import ActiveLink from "../ActiveLink";
import SunIcon from "../../public/icons/sun.svg";
import MoonIcon from "../../public/icons/moon.svg";
import CameraIcon from "../../public/icons/camera.svg";
import styles from "./style.module.scss";
// const styles = {} as any;
import { useHasRendered, useWindowScroll } from "../../util/hooks";

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
  const { scrollY } = useWindowScroll();

  const stickyOffset = app.stickyNavTop
    ? -Math.max(scrollY - app.stickyNavTop, 0)
    : 0;

  return (
    <nav
      className={clsx(styles.nav, app.isUiHidden && styles.uiHidden)}
      style={
        {
          top: app.stickyNavTop ? 0 : undefined,
          "--sticky-offset": `${stickyOffset}px`,
        } as React.CSSProperties
      }
    >
      <div className={styles.links}>
        {links.map((link) => (
          <ActiveLink
            key={link.href}
            href={link.href}
            activeOnExact={link.activeOnExact}
            activeClassName={styles.isActive}
          >
            {link.text}
          </ActiveLink>
        ))}
      </div>
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
