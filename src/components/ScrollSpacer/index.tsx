import React, { useEffect } from "react";
import { useWindowSize } from "~/util/hooks";
import styles from "./style.module.scss";
import { useApp } from "~/store/app";

interface ScrollSpacerProps {
  percentage: number;
}

export const ScrollSpacer: React.FC<ScrollSpacerProps> = ({ percentage }) => {
  const setStickyNavTop = useApp((s) => s.setStickyNavTop);
  const { width, height } = useWindowSize();

  const isRendering = width < 880;
  const spacerHeight = (height - 100) * (percentage / 100);

  useEffect(() => {
    if (!isRendering) {
      setStickyNavTop(0);
    } else {
      setStickyNavTop(spacerHeight);
    }
  }, [isRendering, spacerHeight, setStickyNavTop]);

  return isRendering ? (
    <div className={styles.scrollSpacer} style={{ height: spacerHeight }} />
  ) : null;
};
