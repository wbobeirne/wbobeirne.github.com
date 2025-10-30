import React, { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, useProgress } from "@react-three/drei";
import { Howdy } from "./Howdy";
import { Camera } from "./Camera";
import { Lights } from "./Lights";
import { Workspace } from "./Workspace";
import { Avatar } from "./Avatar";
import { StarrySky } from "./StarrySky";
import { Balloons } from "./Balloons";
import styles from "./style.module.scss";
import { useLocation } from "@tanstack/react-router";
import { useTheme } from "~/store/theme";

interface WebGLBackgroundProps {
  onLoaded: () => void;
}

export const WebGLBackground: React.FC<WebGLBackgroundProps> = ({
  onLoaded,
}) => {
  const { pathname } = useLocation();
  const theme = useTheme((s) => s.theme);
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleLoaded = useCallback(() => {
    setHasLoaded(true);
    onLoaded();
  }, [onLoaded]);

  return (
    <div className={clsx(styles.container, hasLoaded && styles.isLoaded)}>
      <Canvas
        dpr={[1, 2]}
        orthographic
        shadows={true}
        camera={{ near: 0.01, far: 10000 }}
      >
        <fog args={[0x000000, 1, 1]} />
        <Lights />
        <group>
          <Howdy />
          <Avatar waving={pathname === "/bio"} />
          <Workspace hasLoaded={hasLoaded} />
          <ContactShadows
            scale={25}
            blur={3}
            opacity={theme === "light" ? 0.2 : 0.5}
            far={20}
            frames={1}
          />
        </group>
        {theme === "light" && <Balloons show={pathname === "/blog"} />}
        {theme === "dark" && <StarrySky show={pathname === "/blog"} />}
        <Camera pathname={pathname} />
        <LoadedCallback onLoaded={handleLoaded} />
      </Canvas>
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
