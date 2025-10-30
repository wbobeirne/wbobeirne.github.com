import React, { CSSProperties, useRef } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import clsx from "clsx";
import tinycolor from "tinycolor2";
import { PROJECT_LOGOS, ProjectKey, PROJECTS } from "~/util/projects";
import { makeTransitionStyleClasses } from "~/util/animation";
import styles from "./style.module.scss";
import MockupImage from "~public/screenshots/mockup.png";
import { Link } from "@tanstack/react-router";

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
  const fullRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const project = PROJECTS[id];
  if (!project) return null;
  const { name, shortName, title, dates, color, description, screenshots } =
    project;
  const Logo = PROJECT_LOGOS[id];
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
          } as CSSProperties
        }
      >
        <SwitchTransition>
          {isActive ? (
            <CSSTransition
              key="full"
              classNames={transitionClasses}
              timeout={transitionDuration}
              nodeRef={fullRef}
            >
              <div className={styles.full}>
                <Link
                  to="/work/{-$projectId}"
                  params={{ projectId: undefined }}
                  resetScroll={false}
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
                    <img
                      src={screenshots.desktop}
                      alt={`Desktop screenshot of ${name}`}
                      width={1060}
                    />
                  </div>
                  <div className={styles.mobile}>
                    <img
                      src={screenshots.mobile}
                      alt={`Mobile screenshot of ${name}`}
                      width={400}
                    />
                  </div>
                  <div className={styles.mockup}>
                    <img src={MockupImage} alt="" width="1280" height="700" />
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
              nodeRef={listRef}
            >
              <div className={styles.list}>
                <Link
                  to="/work/{-$projectId}"
                  params={{ projectId: id }}
                  resetScroll={false}
                >
                  <div className={styles.logo}>
                    <Logo />
                  </div>
                  <h3 className={styles.name}>{shortName ?? name}</h3>
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
