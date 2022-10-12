import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import clsx from "clsx";
import tinycolor from "tinycolor2";
import { ProjectKey, PROJECTS } from "../../util/projects";
import styles from "./style.module.scss";
import { makeTransitionStyleClasses } from "../../util/animation";

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
  const { name, shortName, title, logo, dates, color, description } =
    PROJECTS[id];
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
            "--color-text": isLight ? "#000000" : "#FFFFFF",
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
                <Link href="/work" shallow scroll={false}>
                  <a className={styles.back}>← Back to other projects</a>
                </Link>
                <div className={styles.top}>
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
                  <a>
                    <div className={styles.logo}>
                      <Image src={logo} alt="" layout="fill" />
                    </div>
                    <h3 className={styles.name}>{shortName || name}</h3>
                  </a>
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
