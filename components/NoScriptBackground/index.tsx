import React from "react";
import styles from "./style.module.scss";

export const NoScriptBackground: React.FC = () => {
  if (
    typeof window !== "undefined" &&
    typeof WebGLRenderingContext === "undefined"
  ) {
    return (
      <div className={styles.container}>
        <div className={styles.frown}>ಥ﹏ಥ</div>
        <div className={styles.message}>
          You would see a cool background
          <br />
          here if your browser supported WebGL
        </div>
      </div>
    );
  }
  return (
    <noscript className={styles.container}>
      <div className={styles.frown}>ಠ_ಠ</div>
      <div className={styles.message}>
        You would see a cool background
        <br />
        here if you had JavaScript enabled
      </div>
    </noscript>
  );
};
