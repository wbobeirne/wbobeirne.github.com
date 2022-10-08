import React, { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import styles from "./style.module.scss";
import { ProjectInfo, ProjectKey, PROJECTS } from "../../../util/projects";
import Image from "next/image";

import VscodeCodeIcon from "../../../public/icons/vscode-code.svg";
import VscodeSearchIcon from "../../../public/icons/vscode-search.svg";
import VscodeSourceControlIcon from "../../../public/icons/vscode-source-control.svg";
import VscodeDebugIcon from "../../../public/icons/vscode-debug.svg";
import VscodeExtensionsIcon from "../../../public/icons/vscode-extensions.svg";

const windowVariants = {
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

interface FakeOSProps {
  activeProject: ProjectKey | null;
}

export const FakeOS: React.FC<FakeOSProps> = ({ activeProject }) => {
  const [project, setProject] = useState<ProjectInfo>();
  const [imgLoadMap, setImgLoadMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!activeProject) return;
    setProject(PROJECTS[activeProject]);
  }, [activeProject]);

  const screenshotUrl =
    project && `/screenshots/${project.screenshots.desktop}`;
  const isScreenshotLoaded = screenshotUrl
    ? !!imgLoadMap[screenshotUrl]
    : false;
  const isBrowserOpen = activeProject && project && isScreenshotLoaded;

  const handleLoad: React.ReactEventHandler<HTMLImageElement> = useCallback(
    (ev) => {
      if (!screenshotUrl) return;
      setImgLoadMap((map) => {
        return {
          ...map,
          [screenshotUrl]: true,
        };
      });
    },
    [screenshotUrl]
  );

  return (
    <div className={styles.scaleWrapper}>
      <div className={styles.container}>
        <div className={styles.topBar}>
          <div>
            <div className={styles.icon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
            </div>
            {isBrowserOpen ? (
              <>
                <div>
                  <strong>Browser</strong>
                </div>
                <div>File</div>
                <div>Edit</div>
                <div>View</div>
                <div>History</div>
                <div>Bookmarks</div>
                <div>Tab</div>
                <div>Window</div>
                <div>Help</div>
              </>
            ) : (
              <>
                <div>
                  <strong>Code</strong>
                </div>
                <div>File</div>
                <div>Edit</div>
                <div>Selection</div>
                <div>View</div>
                <div>Go</div>
                <div>Run</div>
                <div>Terminal</div>
                <div>Window</div>
                <div>Help</div>
              </>
            )}
          </div>
          <div>
            <div className={styles.icon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                <path d="M54.2 202.9C123.2 136.7 216.8 96 320 96s196.8 40.7 265.8 106.9c12.8 12.2 33 11.8 45.2-.9s11.8-33-.9-45.2C549.7 79.5 440.4 32 320 32S90.3 79.5 9.8 156.7C-2.9 169-3.3 189.2 8.9 202s32.5 13.2 45.2 .9zM320 256c56.8 0 108.6 21.1 148.2 56c13.3 11.7 33.5 10.4 45.2-2.8s10.4-33.5-2.8-45.2C459.8 219.2 393 192 320 192s-139.8 27.2-190.5 72c-13.3 11.7-14.5 31.9-2.8 45.2s31.9 14.5 45.2 2.8c39.5-34.9 91.3-56 148.2-56zm64 160c0-35.3-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64s64-28.7 64-64z" />
              </svg>
            </div>
            <div className={styles.icon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M0 176c0-44.2 35.8-80 80-80H464c44.2 0 80 35.8 80 80v16c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32v16c0 44.2-35.8 80-80 80H80c-44.2 0-80-35.8-80-80V176zm80-16c-8.8 0-16 7.2-16 16V336c0 8.8 7.2 16 16 16H464c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H80zm368 32V320H96V192H448z" />
              </svg>
            </div>
            <div className={styles.icon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
              </svg>
            </div>
            <div>
              {new Date().toLocaleString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </div>
          </div>
        </div>
        <div className={clsx(styles.window, styles.ide)}>
          <div className={styles.titleBar}>
            <div className={styles.buttons}>
              <button className={styles.close} />
              <button className={styles.minimize} />
              <button className={styles.maximize} />
            </div>
            <div className={styles.title}>index.tsx - project</div>
          </div>
          <div className={styles.content}>
            <div className={styles.sidebar}>
              <div className={styles.icon}>
                <VscodeCodeIcon />
              </div>
              <div className={styles.icon}>
                <VscodeSearchIcon />
              </div>
              <div className={styles.icon}>
                <VscodeSourceControlIcon />
              </div>
              <div className={styles.icon}>
                <VscodeDebugIcon />
              </div>
              <div className={styles.icon}>
                <VscodeExtensionsIcon />
              </div>
            </div>
            <div className={styles.files}>
              <div className={clsx(styles.filename, styles.projectTitle)}>
                › project
              </div>
              <div className={clsx(styles.filename, styles.faded)}>› .git</div>
              <div className={clsx(styles.filename, styles.faded)}>› dist</div>
              <div className={styles.filename}>› src</div>
              <div
                className={clsx(
                  styles.filename,
                  styles.indent,
                  styles.selected
                )}
              >
                index.tsx
              </div>
              <div className={clsx(styles.filename, styles.indent)}>
                style.module.scss
              </div>
              <div className={styles.filename}>.eslintrc</div>
              <div className={styles.filename}>.gitignore</div>
              <div className={styles.filename}>package.json</div>
              <div className={styles.filename}>README.md</div>
              <div className={styles.filename}>tsconfig.json</div>
              <div className={styles.filename}>yarn.lock</div>
            </div>
            <div className={styles.code}></div>
          </div>
        </div>
        {project && (
          <motion.div
            className={clsx(styles.window, styles.browser)}
            variants={windowVariants}
            animate={isBrowserOpen ? "open" : "closed"}
            transition={{ type: "inertia" }}
          >
            <div className={styles.titleBar}>
              <div className={styles.buttons}>
                <button className={styles.close} />
                <button className={styles.minimize} />
                <button className={styles.maximize} />
              </div>
              <div className={styles.browserControls}>
                <div className={styles.navigation}>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                    </svg>
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                    </svg>
                  </div>
                </div>
                <div className={styles.urlBar}>{project.website}</div>
                <div />
              </div>
            </div>
            <div className={styles.content}>
              <Image
                src={project.screenshots.desktop}
                placeholder="blur"
                alt={`Screenshot of ${project.name}`}
                onLoad={handleLoad}
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
