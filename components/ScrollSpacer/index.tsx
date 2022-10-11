import React, { useEffect, useState } from "react";
import { useAppContext } from "../../contexts/app";
import { useWindowSize } from "../../util/hooks";
import styles from "./style.module.scss";

interface ScrollSpacerProps {
  percentage: number;
}

export const ScrollSpacer: React.FC<ScrollSpacerProps> = ({ percentage }) => {
  const { setStickyNavTop } = useAppContext();
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
