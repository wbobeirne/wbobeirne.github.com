import React from "react";
import { motion } from "framer-motion";
import styles from "./style.module.scss";
import { dur } from "../../util/animation";
import { useAppContext } from "../../contexts/app";

const motionVariants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 100 },
};

interface TemplateProps {
  children: React.ReactNode;
}

export const Template: React.FC<TemplateProps> = ({ children }) => {
  const { isUiHidden } = useAppContext();

  return (
    <div className={styles.container}>
      <motion.main
        variants={motionVariants}
        initial="hidden"
        animate={isUiHidden ? "hidden" : "enter"}
        exit="exit"
        transition={{ duration: dur(0.3), type: "spring" }}
      >
        {children}
      </motion.main>
    </div>
  );
};
