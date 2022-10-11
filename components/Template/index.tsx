import React from "react";
import styles from "./style.module.scss";
import { useAppContext } from "../../contexts/app";
import clsx from "clsx";

interface TemplateProps {
  children: React.ReactNode;
}

export const Template: React.FC<TemplateProps> = ({ children }) => {
  const { isUiHidden } = useAppContext();

  return (
    <div className={styles.container}>
      <main className={clsx(isUiHidden && styles.isHidden)}>{children}</main>
    </div>
  );
};
