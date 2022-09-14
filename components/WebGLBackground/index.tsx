import { useRouter } from "next/router";
import React from "react";
import { Canvas } from "@react-three/fiber";
import styles from "./style.module.scss";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  Plane,
} from "@react-three/drei";
import { Howdy } from "./Howdy";
import { Camera } from "./Camera";
import { Lights } from "./Lights";
import { Workspace } from "./Workspace";
export const WebGLBackground: React.FC = () => {
  const { pathname } = useRouter();

  return (
    <div className={styles.container}>
      <Canvas dpr={[1, 2]}>
        <group>
          <Howdy />
          <Workspace />
          <ContactShadows
            scale={25}
            blur={3}
            opacity={0.4}
            far={20}
            frames={1}
          />
        </group>
        <Camera pathname={pathname} />
        <Lights />
        {/* <Environment preset="warehouse" /> */}
        {/* <OrbitControls makeDefault /> */}
      </Canvas>
    </div>
  );
};
