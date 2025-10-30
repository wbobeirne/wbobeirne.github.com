import clsx from "clsx";
import React from "react";
import styles from "./style.module.scss";

interface LoaderBackgroundProps {
  hasLoaded: boolean;
}

export const LoaderBackground: React.FC<LoaderBackgroundProps> = ({
  hasLoaded,
}) => {
  const id = "loader-background";
  return (
    <>
      {/* Hide the loader when no JS is available */}
      <noscript>
        <style dangerouslySetInnerHTML={{ __html: `#${id}{display: none}` }} />
      </noscript>
      <div
        id={id}
        className={clsx(styles.container, hasLoaded && styles.hasLoaded)}
      >
        <div className={styles.loader}>
          <div className={styles.ring} />
          <div className={styles.ring} />
          <div className={styles.ring} />
          <div className={styles.ring} />
          <div className={styles.ring} />
          <div className={styles.ring} />
          <div className={styles.ring} />
          <div className={styles.ring} />
          <div className={styles.ring} />
          <div className={styles.ring} />
        </div>
      </div>
    </>
  );
};
