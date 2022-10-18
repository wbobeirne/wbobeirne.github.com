import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, useProgress } from "@react-three/drei";
import { Howdy } from "./Howdy";
import { Camera } from "./Camera";
import { Lights } from "./Lights";
import { Workspace } from "./Workspace";
import { Avatar } from "./Avatar";
import { ThemeContext } from "../../contexts/theme";
import { AppContext } from "../../contexts/app";
import { StarrySky } from "./StarrySky";
import { Balloons } from "./Balloons";
import styles from "./style.module.scss";

interface WebGLBackgroundProps {
  onLoaded: () => void;
}

export const WebGLBackground: React.FC<WebGLBackgroundProps> = ({
  onLoaded,
}) => {
  const { pathname } = useRouter();
  const [loaded, setLoaded] = useState(false);

  const handleLoaded = useCallback(() => {
    setLoaded(true);
    onLoaded();
  }, [onLoaded]);

  return (
    <div className={clsx(styles.container, loaded && styles.isLoaded)}>
      <ThemeContext.Consumer>
        {(theme) => (
          <AppContext.Consumer>
            {(app) => (
              <Canvas
                dpr={[1, 2]}
                orthographic
                shadows={true}
                camera={{ near: 0.01, far: 10000 }}
              >
                <ThemeContext.Provider value={theme}>
                  <AppContext.Provider value={app}>
                    <fog near={1} far={1} color={0x000000} />
                    <Lights />
                    <group>
                      <Howdy />
                      <Avatar waving={pathname === "/bio"} />
                      <Workspace />
                      <ContactShadows
                        key={theme.mode}
                        scale={25}
                        blur={3}
                        opacity={theme.mode === "light" ? 0.4 : 0.8}
                        far={20}
                        frames={1}
                      />
                    </group>
                    {theme.mode === "light" && (
                      <Balloons show={pathname === "/blog"} />
                    )}
                    {theme.mode === "dark" && <StarrySky />}
                    <Camera pathname={pathname} />
                  </AppContext.Provider>
                </ThemeContext.Provider>
                <LoadedCallback onLoaded={handleLoaded} />
              </Canvas>
            )}
          </AppContext.Consumer>
        )}
      </ThemeContext.Consumer>
    </div>
  );
};

const LoadedCallback: React.FC<{ onLoaded: () => void }> = ({ onLoaded }) => {
  const { progress } = useProgress();
  useEffect(() => {
    if (progress >= 100) onLoaded();
  }, [onLoaded, progress]);
  return null;
};

export default WebGLBackground;
