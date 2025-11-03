import clsx from "clsx";
import React, { forwardRef } from "react";
import { useApp } from "~/store/app";
import styles from "./style.module.scss";

interface TemplateProps {
  children: React.ReactNode;
}

export const Template = forwardRef<HTMLDivElement, TemplateProps>(
  ({ children }, ref) => {
    const isUiHidden = useApp((s) => s.isUiHidden);

    return (
      <div
        className={clsx(styles.container, isUiHidden && styles.isHidden)}
        ref={ref}
      >
        <main>{children}</main>
      </div>
    );
  },
);
Template.displayName = "Template";
