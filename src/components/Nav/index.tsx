import clsx from "clsx";
import React from "react";
import SunIcon from "~public/icons/sun.svg?react";
import MoonIcon from "~public/icons/moon.svg?react";
import styles from "./style.module.scss";
import { useHasRendered, useWindowScroll } from "~/util/hooks";
import { useTheme } from "~/store/theme";
import { useApp } from "~/store/app";
import { Link } from "@tanstack/react-router";

const links = [
  {
    text: "WBO",
    to: "/",
  },
  {
    text: "Bio",
    to: "/bio",
  },
  {
    text: "Work",
    to: "/work",
  },
  {
    text: "Blog",
    to: "/blog",
  },
] as const;

export const Nav: React.FC = () => {
  const stickyNavTop = useApp((s) => s.stickyNavTop);
  const isUiHidden = useApp((s) => s.isUiHidden);
  // const toggleUiHidden = useApp((s) => s.toggleUiHidden);
  const theme = useTheme((s) => s.theme);
  const toggleTheme = useTheme((s) => s.toggleTheme);
  const hasRendered = useHasRendered();
  const { scrollY } = useWindowScroll();

  const stickyOffset = stickyNavTop ? -Math.max(scrollY - stickyNavTop, 0) : 0;

  return (
    <nav
      className={clsx(styles.nav, isUiHidden && styles.uiHidden)}
      style={
        {
          top: stickyNavTop ? 0 : undefined,
          "--sticky-offset": `${stickyOffset}px`,
        } as React.CSSProperties
      }
    >
      <div className={styles.links}>
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            activeOptions={{ exact: link.to === "/" }}
            activeProps={{ className: styles.isActive }}
            viewTransition
          >
            {link.text}
          </Link>
        ))}
      </div>
      {hasRendered && (
        <div className={styles.buttons}>
          {/* <button onClick={toggleUiHidden}>
            <CameraIcon />
          </button> */}
          <button className={styles.themeToggle} onClick={toggleTheme}>
            {theme === "light" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      )}
    </nav>
  );
};
