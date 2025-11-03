import { ContactShadows, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useLocation } from "@tanstack/react-router";
import clsx from "clsx";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "~/store/theme";
import { Avatar } from "./Avatar";
import { Balloons } from "./Balloons";
import { Camera } from "./Camera";
import { Howdy } from "./Howdy";
import { Lights } from "./Lights";
import { StarrySky } from "./StarrySky";
import { Workspace } from "./Workspace";
import styles from "./style.module.scss";

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
  const hasLoadedRef = useRef(false);
  useEffect(() => {
    if (hasLoadedRef.current) return;
    if (progress >= 100) {
      requestAnimationFrame(() => onLoaded());
      hasLoadedRef.current = true;
    }
  }, [onLoaded, progress]);
  return null;
};

export default WebGLBackground;
