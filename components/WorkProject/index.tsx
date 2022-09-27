import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import clsx from "clsx";
import tinycolor from "tinycolor2";
import { dur } from "../../util/animation";
import styles from "./style.module.scss";
import { ProjectInfo } from "../../pages/work/[[...project]]";

interface WorkProjectProps extends ProjectInfo {
  id: string;
  description: React.ReactNode;
  isActive: boolean;
}

export const WorkProject = React.forwardRef<HTMLDivElement, WorkProjectProps>(
  ({ id, logo, name, shortName, dates, description, color, isActive }, ref) => {
    const isLight = tinycolor(color.secondary).isLight();
    return (
      <div className={styles.container}>
        <motion.div
          ref={ref}
          className={clsx(styles.content, isActive && styles.isActive)}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: dur(0.3) }}
          initial={false}
          layout
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
            } as any
          }
        >
          <AnimatePresence mode="popLayout">
            {isActive ? (
              <motion.div
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: -20 }}
                transition={{ duration: dur(0.3) }}
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
                <div className={styles.dates}>{dates}</div>
                <div className={styles.description}>{description}</div>
              </motion.div>
            ) : (
              <motion.div
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: -20 }}
                transition={{ duration: dur(0.3) }}
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
      </div>
    );
  }
);
WorkProject.displayName = "WorkProject";
