import { motion, AnimatePresence, Target } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import tinycolor from "tinycolor2";
import { dur } from "../../util/animation";
import styles from "./style.module.scss";
import { ProjectKey, PROJECTS } from "../../util/projects";
import { useTheme } from "../../contexts/theme";

interface WorkProjectProps {
  id: ProjectKey;
  index: number;
  description: React.ReactNode;
  isActive: boolean;
  containerWidth: number;
}

export const WorkProject: React.FC<WorkProjectProps> = ({
  id,
  index,
  isActive,
  containerWidth,
}) => {
  const theme = useTheme();
  const { name, shortName, title, logo, dates, color, description } =
    PROJECTS[id];
  const isLight = tinycolor(color.secondary).isLight();

  const containerStyle = useMemo(() => {
    let width: string | number = "100%";
    let height: string | number = "100%";
    let top = 0;
    let left = 0;
    let zIndex: undefined | number = 2;
    let transitionEnd: Target = {};
    const columns = containerWidth > 500 ? 3 : 2;
    if (!isActive) {
      const padding = containerWidth * (1 / columns) * 0.2;
      width = containerWidth * (1 / columns) * 0.8;
      height = width;
      top = (height + padding) * Math.floor(index / columns);
      left = (width + padding) * (index % columns);
      zIndex = undefined;
      transitionEnd.zIndex = 1;
    }
    return { width, height, top, left, zIndex, transitionEnd };
  }, [index, isActive, containerWidth]);

  useEffect(() => {}, []);

  return (
    <motion.div
      className={styles.container}
      animate={containerStyle}
      transition={{
        type: "spring",
        bounce: 0.2,
        duration: dur(0.5),
        delay: isActive ? 0 : dur(0.2),
      }}
      initial={false}
    >
      <motion.div
        className={clsx(styles.content, isActive && styles.isActive)}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        initial={false}
        style={
          {
            "--color-primary": color.primary,
            "--color-secondary": color.secondary,
            "--color-secondary-dark": isLight
              ? tinycolor(color.secondary).desaturate(10).darken(5)
              : tinycolor(color.secondary).desaturate(10).lighten(5),
            "--color-secondary-darker": isLight
              ? tinycolor(color.secondary).desaturate(10).darken(10)
              : tinycolor(color.secondary).desaturate(10).lighten(10),
            "--color-text": isLight ? "#000000" : "#FFFFFF",
          } as any
        }
      >
        <AnimatePresence mode="wait">
          {isActive ? (
            <motion.div
              key="full"
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -20 }}
              initial={{ opacity: 0, translateY: -20 }}
              transition={{ duration: dur(0.2) }}
              className={styles.full}
            >
              <Link href="/work" shallow>
                <a className={styles.back}>See other projects</a>
              </Link>
              <div>
                <div className={styles.logo}>
                  <Image
                    src={logo}
                    alt=""
                    width={80}
                    height={80}
                    layout="intrinsic"
                  />
                </div>
                <h3 className={styles.name}>{name}</h3>
              </div>
              <div className={styles.title}>{title}</div>
              <div className={styles.dates}>{dates}</div>
              <div className={styles.description}>{description}</div>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: dur(0.2), delay: isActive ? 0 : 0.3 }}
              className={styles.list}
            >
              <Link href={`/work/${id}`} shallow>
                <a>
                  <div className={styles.logo}>
                    <Image src={logo} alt="" layout="fill" />
                  </div>
                  <h3 className={styles.name}>{shortName || name}</h3>
                </a>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
WorkProject.displayName = "WorkProject";
