import React, { useEffect, useRef, useState } from "react";
import { useHelper } from "@react-three/drei";
import {
  DirectionalLightHelper,
  PointLightHelper,
  SpotLightHelper,
} from "three";
import { useTheme } from "../../contexts/theme";
import { useFrame } from "@react-three/fiber";
import { useAppContext } from "../../contexts/app";

export const Lights: React.FC = () => {
  const theme = useTheme();
  const { debug } = useAppContext();
  const ambientLightRef = useRef<any>();
  const pointLightRef = useRef<any>();
  const spotLightRef = useRef<any>();
  const dirLightRef = useRef<any>();
  const spotLightRef2 = useRef<any>();
  const dirLightRef2 = useRef<any>();
  const [hasMovedTarget, setHasMovedTarget] = useState(false);

  const ambientIntensity = theme.mode === "light" ? 0.5 : 0.2;
  const spotIntensity = theme.mode === "light" ? 0.1 : 2.0;
  const frontDirIntensity = theme.mode === "light" ? 0.6 : 0.4;
  const backDirIntensity = theme.mode === "light" ? 0.3 : 0.4;

  useHelper(debug ? pointLightRef : null, PointLightHelper, 1, "red");
  useHelper(debug ? spotLightRef : null, SpotLightHelper, "blue");
  useHelper(debug ? dirLightRef : null, DirectionalLightHelper, 1, "green");
  useHelper(debug ? spotLightRef2 : null, SpotLightHelper, "blue");
  useHelper(debug ? dirLightRef2 : null, DirectionalLightHelper, 1, "green");

  useFrame(({ scene }) => {
    if (hasMovedTarget) return;
    if (!spotLightRef.current || !spotLightRef2.current) return;
    scene.add(spotLightRef.current.target);
    spotLightRef.current.target.position.set(1, 4, 1);
    scene.add(spotLightRef2.current.target);
    spotLightRef2.current.target.position.set(0.25, 2, -1.75);
    setHasMovedTarget(true);
  });

  return (
    <>
      <ambientLight ref={ambientLightRef} intensity={ambientIntensity} />
      <pointLight
        ref={pointLightRef}
        position={[4, 10, 5]}
        intensity={0.5 * 0.1}
      />
      <spotLight
        ref={spotLightRef}
        args={[0xffffff]}
        position={[4, 7, 5]}
        intensity={spotIntensity}
        distance={15}
        penumbra={0.8}
        angle={Math.PI / 12}
        castShadow
      />
      <directionalLight
        ref={dirLightRef}
        args={[0xffffff]}
        position={[0.1, 5, 4]}
        intensity={frontDirIntensity}
      />
      <spotLight
        ref={spotLightRef2}
        args={[0xffffff]}
        position={[1, 5, -3]}
        intensity={spotIntensity * 2}
        distance={8}
        penumbra={0.8}
        angle={Math.PI / 6}
        castShadow
      />
      <directionalLight
        ref={dirLightRef2}
        args={[0xffffff]}
        position={[0, 4, -4]}
        intensity={backDirIntensity}
      />
    </>
  );
};
