import React, { useCallback, useEffect, useState, useRef } from "react";
import clsx from "clsx";
import { ProjectInfo, ProjectKey, PROJECTS } from "../../../util/projects";
import Image from "next/image";
import { Window } from "./Window";
import styles from "./style.module.scss";

import AppleIcon from "../../../public/icons/apple.svg";
import WifiIcon from "../../../public/icons/wifi.svg";
import BatteryIcon from "../../../public/icons/battery.svg";
import SearchIcon from "../../../public/icons/search.svg";
import VscodeCodeIcon from "../../../public/icons/vscode-code.svg";
import VscodeSearchIcon from "../../../public/icons/vscode-search.svg";
import VscodeSourceControlIcon from "../../../public/icons/vscode-source-control.svg";
import VscodeDebugIcon from "../../../public/icons/vscode-debug.svg";
import VscodeExtensionsIcon from "../../../public/icons/vscode-extensions.svg";

export const OS_WIDTH = 1460;
export const OS_HEIGHT = 768;
export const OS_TOPBAR_HEIGHT = 28;

interface FakeOSProps {
  activeProject: ProjectKey | null;
}

export const FakeOS: React.FC<FakeOSProps> = ({ activeProject }) => {
  const [project, setProject] = useState<ProjectInfo>();
  const [imgLoadMap, setImgLoadMap] = useState<Record<string, boolean>>({});
  const [windowZ, setWindowZ] = useState({ code: 0, browser: 1 });
  const [shouldShowScreenshot, setShouldShowScreenshot] = useState(false);

  useEffect(() => {
    if (!activeProject) return;
    setProject(PROJECTS[activeProject]);
    setWindowZ((z) => ({ code: z.code, browser: z.code + 1 }));
  }, [activeProject]);

  const screenshotUrl =
    project && `/screenshots/${project.screenshots.desktop}`;
  const isScreenshotLoaded = screenshotUrl
    ? shouldShowScreenshot && !!imgLoadMap[screenshotUrl]
    : false;
  const isBrowserOpen = !!activeProject && !!project;

  console.log({ activeProject, project, shouldShowScreenshot });

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (!screenshotUrl || !isBrowserOpen) {
      timeout = setTimeout(() => setShouldShowScreenshot(false), 300);
    } else {
      timeout = setTimeout(() => {
        setShouldShowScreenshot(true);
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [screenshotUrl, isBrowserOpen]);

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

  const bumpZ = useCallback((key: keyof typeof windowZ) => {
    setWindowZ((z) => {
      const highestZ = Object.values(z).reduce((prev, z) => Math.max(prev, z));
      return { ...z, [key]: highestZ + 1 };
    });
  }, []);

  return (
    <div className={styles.scaleWrapper}>
      <div className={styles.container}>
        <div className={styles.topBar}>
          <div>
            <div className={styles.icon}>
              <AppleIcon />
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
              <WifiIcon />
            </div>
            <div className={styles.icon}>
              <BatteryIcon />
            </div>
            <div className={styles.icon}>
              <SearchIcon />
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

        <Window
          box={{
            top: OS_HEIGHT * 0.12,
            left: OS_WIDTH * 0.05,
            width: OS_WIDTH * 0.65,
            height: OS_HEIGHT * 0.85,
          }}
          zIndex={windowZ.code}
          isOpen={true}
          title="index.tsx - project"
          classNames={{
            window: styles.ide,
            titleBar: styles.titleBar,
            content: styles.content,
          }}
          onMouseDown={() => bumpZ("code")}
        >
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
              className={clsx(styles.filename, styles.indent, styles.selected)}
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
        </Window>

        {project && (
          <Window
            box={{
              top: OS_HEIGHT * 0.06,
              left: OS_WIDTH * 0.2,
              width: OS_WIDTH * 0.72,
              height: OS_WIDTH * 0.4,
            }}
            zIndex={windowZ.browser}
            isOpen={isBrowserOpen}
            onMouseDown={() => bumpZ("browser")}
            title={
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
                <div className={styles.urlBar}>
                  <span>{project.website}</span>
                  {!isScreenshotLoaded && (
                    <div className={styles.loading}>
                      <svg viewBox="0 0 50 50">
                        <circle
                          cx="25"
                          cy="25"
                          r="20"
                          fill="none"
                          strokeWidth="5"
                          strokeLinecap="round"
                        ></circle>
                      </svg>
                    </div>
                  )}
                </div>
                <div />
              </div>
            }
            classNames={{
              window: styles.browser,
              titleBar: styles.titleBar,
            }}
          >
            {shouldShowScreenshot && (
              <Image
                src={project.screenshots.desktop}
                alt={`Screenshot of ${project.name}`}
                onLoad={handleLoad}
                layout="responsive"
              />
            )}
          </Window>
        )}
      </div>
    </div>
  );
};
