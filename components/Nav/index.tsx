import React from "react";
import ActiveLink from "../ActiveLink";
import styles from "./style.module.scss";

export const Nav: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <ActiveLink href="/" activeClassName="active">
        <a>WBO</a>
      </ActiveLink>
      <ActiveLink href="/bio" activeClassName="active">
        <a>Bio</a>
      </ActiveLink>
      <ActiveLink href="/work" activeClassName="active">
        <a>Work</a>
      </ActiveLink>
      <ActiveLink href="/blog" activeClassName="active">
        <a>Blog</a>
      </ActiveLink>
    </nav>
  );
};
