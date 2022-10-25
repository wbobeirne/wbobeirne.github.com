import React, { useCallback, useEffect, useState, useRef } from "react";
import styles from "./style.module.scss";
import { useUpdatingRef } from "../../../../util/hooks";
import clsx from "clsx";
import { OS_HEIGHT, OS_TOPBAR_HEIGHT, OS_WIDTH } from "..";

interface WindowProps {
  children: React.ReactNode;
  title: React.ReactNode;
  box: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  zIndex: number;
  isOpen?: boolean;
  classNames?: {
    window?: string;
    titleBar?: string;
    content?: string;
  };
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
}

export const Window: React.FC<WindowProps> = ({
  title,
  children,
  box: propsBox,
  isOpen: propsIsOpen,
  zIndex,
  classNames = {},
  onMouseDown,
}) => {
  const preMaximizeBox = useRef(propsBox);
  const [box, setBox] = useState(propsBox);
  const [isOpen, setIsOpen] = useState(
    propsIsOpen === undefined ? true : propsIsOpen
  );
  const [isMaximized, setIsMaximized] = useState(false);
  const boxRef = useUpdatingRef(box);
  const propsBoxRef = useUpdatingRef(propsBox);

  useEffect(() => {
    if (propsIsOpen === undefined) return;
    setIsOpen(propsIsOpen);
    if (propsIsOpen) {
      setBox({ ...propsBoxRef.current });
    }
  }, [propsIsOpen, propsBoxRef]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleMaximize = useCallback(() => {
    setIsMaximized((wasMaximized) => {
      if (wasMaximized) {
        setBox({ ...preMaximizeBox.current });
      } else {
        setBox((oldBox) => {
          preMaximizeBox.current = oldBox;
          return { top: 28, left: 0, height: OS_HEIGHT - 28, width: OS_WIDTH };
        });
      }
      return !wasMaximized;
    });
  }, []);

  const startDragging: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (ev) => {
      if ((ev.target as HTMLElement).nodeName === "BUTTON") return;
      ev.preventDefault();
      // Non-standard properties, should have good support but just don't support dragging
      // if they're missing.
      const startBox = { ...boxRef.current };
      const startX = ev.clientX;
      const startY = ev.clientY;
      const targetWidth = ev.currentTarget.clientWidth;
      const moveHandler = (ev: MouseEvent) => {
        ev.preventDefault();
        const xDiff = ev.clientX - startX;
        const yDiff = ev.clientY - startY;
        // TODO: These values are multipliers for its zoomed skewed size. Figure
        // out how to calculate these values dynamically using getBoundingClientRect
        // or something. With enough math, I'm sure there's a way to do it.
        const left = startBox.left + xDiff * 1.85 - yDiff * 0.1;
        const top = startBox.top + yDiff * 1.8 + xDiff * 0.1;
        const limit = 40;
        setBox((b) => ({
          ...b,
          left: Math.min(
            OS_WIDTH - limit,
            Math.max(left, -targetWidth + limit)
          ),
          top: Math.min(OS_HEIGHT - limit, Math.max(top, OS_TOPBAR_HEIGHT)),
        }));
      };
      window.addEventListener("mousemove", moveHandler);
      window.addEventListener("mouseup", (ev) => {
        window.removeEventListener("mousemove", moveHandler);
      });
    },
    [boxRef]
  );

  return (
    <div
      className={clsx(
        styles.window,
        classNames.window,
        isMaximized && styles.isMaximized,
        !isOpen && styles.isClosed
      )}
      style={{ ...box, zIndex }}
      onMouseDown={onMouseDown}
    >
      <div
        className={clsx(styles.titleBar, classNames.titleBar)}
        onMouseDown={startDragging}
      >
        <div className={styles.buttons}>
          <button className={styles.close} onClick={close} />
          <button className={styles.minimize} onClick={close} />
          <button className={styles.maximize} onClick={toggleMaximize} />
        </div>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={clsx(styles.content, classNames.content)}>{children}</div>
    </div>
  );
};
