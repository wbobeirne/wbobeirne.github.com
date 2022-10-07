import { useRouter } from "next/router";
import React from "react";
import { Canvas } from "@react-three/fiber";
import styles from "./style.module.scss";
import { ContactShadows } from "@react-three/drei";
import { Howdy } from "./Howdy";
import { Camera } from "./Camera";
import { Lights } from "./Lights";
import { Workspace } from "./Workspace";
import { Avatar } from "./Avatar";
import { ThemeContext } from "../../contexts/theme";
import { AppContext } from "../../contexts/app";

export const WebGLBackground: React.FC = () => {
  const { pathname } = useRouter();

  return (
    <div className={styles.container}>
      <ThemeContext.Consumer>
        {(theme) => (
          <AppContext.Consumer>
            {(app) => (
              <Canvas dpr={[1, 2]} orthographic shadows={true}>
                <ThemeContext.Provider value={theme}>
                  <AppContext.Provider value={app}>
                    <Lights />
                    <group>
                      <Howdy />
                      <Avatar />
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
                    <Camera pathname={pathname} />
                  </AppContext.Provider>
                </ThemeContext.Provider>
              </Canvas>
            )}
          </AppContext.Consumer>
        )}
      </ThemeContext.Consumer>
    </div>
  );
};
