import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import clsx from "clsx";
import tinycolor from "tinycolor2";
import { ProjectKey, PROJECTS } from "../../util/projects";
import { makeTransitionStyleClasses } from "../../util/animation";
import styles from "./style.module.scss";

import MockupImage from "../../public/screenshots/mockup.png";

const transitionDuration = 400;
const transitionClasses = makeTransitionStyleClasses(styles);

interface WorkProjectProps {
  id: ProjectKey;
  index: number;
  isActive: boolean;
  isInactive: boolean;
}

export const WorkProject: React.FC<WorkProjectProps> = ({
  id,
  isActive,
  isInactive,
}) => {
  const {
    name,
    shortName,
    title,
    logo: Logo,
    dates,
    color,
    description,
    screenshots,
  } = PROJECTS[id];
  const isLight = tinycolor(color.secondary).isLight();

  return (
    <div
      className={clsx(
        styles.container,
        isActive && styles.isActive,
        isInactive && styles.isInactive
      )}
    >
      <div
        className={clsx(styles.content, isActive && styles.isActive)}
        style={
          {
            "--color-primary": color.primary,
            "--color-secondary": color.secondary,
            "--color-secondary-dark": isLight
              ? tinycolor(color.secondary).desaturate(10).darken(5)
              : tinycolor(color.secondary).desaturate(10).lighten(10),
            "--color-secondary-darker": isLight
              ? tinycolor(color.secondary).desaturate(10).darken(10)
              : tinycolor(color.secondary).desaturate(10).lighten(5),
            "--color-text": isLight ? "#1E1E1E" : "#FFFFFF",
            "--color-textStrong": isLight ? "#000000" : "#FFFFFF",
            "--color-textInvert": isLight ? "#FFFFFF" : "#1E1E1E",
          } as any
        }
      >
        <SwitchTransition>
          {isActive ? (
            <CSSTransition
              key="full"
              classNames={transitionClasses}
              timeout={transitionDuration}
            >
              <div className={styles.full}>
                <Link
                  href="/work"
                  shallow
                  scroll={false}
                  className={styles.back}
                >
                  ← Back to other projects
                </Link>
                <div className={styles.top}>
                  <div className={styles.logo}>
                    <Logo />
                  </div>
                  <h3 className={styles.name}>{name}</h3>
                </div>
                <div className={styles.title}>{title}</div>
                <div className={styles.dates}>{dates}</div>
                <div className={styles.screenshots}>
                  <div className={styles.desktop}>
                    <Image
                      src={screenshots.desktop}
                      alt={`Desktop screenshot of ${name}`}
                    />
                  </div>
                  <div className={styles.mobile}>
                    <Image
                      src={screenshots.mobile}
                      alt={`Mobile screenshot of ${name}`}
                    />
                  </div>
                  <div className={styles.mockup}>
                    <Image src={MockupImage} alt="" />
                  </div>
                </div>
                <div className={styles.description}>{description}</div>
              </div>
            </CSSTransition>
          ) : (
            <CSSTransition
              key="list"
              classNames={transitionClasses}
              timeout={transitionDuration}
            >
              <div className={styles.list}>
                <Link href={`/work/${id}`} shallow scroll={false}>
                  <div className={styles.logo}>
                    <Logo />
                  </div>
                  <h3 className={styles.name}>{shortName || name}</h3>
                </Link>
              </div>
            </CSSTransition>
          )}
        </SwitchTransition>
      </div>
    </div>
  );
};
WorkProject.displayName = "WorkProject";
