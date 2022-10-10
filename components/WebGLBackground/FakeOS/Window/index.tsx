import React, { useCallback, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./style.module.scss";
import { useUpdatingRef } from "../../../../util/hooks";

const variants = {
  open: {
    scale: 1,
    translateY: "0%",
    transformOrigin: "top center",
  },
  closed: {
    scale: 0,
    translateY: "100%",
    transformOrigin: "top center",
  },
};

interface WindowProps {
  children: React.ReactNode;
  title: React.ReactNode;
  box: {
    top: number;
    left: number;
    width: number | string;
    height: number | string;
  };
  isOpen?: boolean;
}

export const Window: React.FC<WindowProps> = ({
  title,
  children,
  box: propsBox,
  isOpen: propsIsOpen,
}) => {
  const propsBoxRef = useUpdatingRef(propsBox);
  const preMaximizeBox = useRef(propsBox);
  const [box, setBox] = useState(propsBox);
  const [isOpen, setIsOpen] = useState(propsIsOpen);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
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
          return { top: 0, left: 0, height: "100%", width: "100%" };
        });
      }
      return !wasMaximized;
    });
  }, []);

  return (
    <motion.div
      className={styles.window}
      variants={variants}
      animate={isOpen ? "open" : "closed"}
      transition={{ type: "spring", bounce: 0, duration: 0.3 }}
    >
      <div className={styles.titleBar}>
        <div className={styles.buttons}>
          <button className={styles.close} onClick={close} />
          <button className={styles.minimize} onClick={close} />
          <button className={styles.maximize} onClick={toggleMaximize} />
        </div>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.content}>{children}</div>
    </motion.div>
  );
};
