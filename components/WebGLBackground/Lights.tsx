import React, { useEffect, useRef, useState } from "react";
import { useHelper } from "@react-three/drei";
import {
  DirectionalLightHelper,
  PointLightHelper,
  SpotLightHelper,
  Vector3,
} from "three";
import { useTheme } from "../../contexts/theme";
import { useFrame } from "@react-three/fiber";

export const Lights: React.FC = () => {
  const theme = useTheme();
  const ambientLightRef = useRef<any>();
  const pointLightRef = useRef<any>();
  const spotLightRef = useRef<any>();
  const dirLightRef = useRef<any>();
  const spotLightRef2 = useRef<any>();
  const dirLightRef2 = useRef<any>();
  const [hasMovedTarget, setHasMovedTarget] = useState(false);

  let ambientIntensity = theme.mode === "light" ? 0.5 : 0.5;
  let spotIntensity = theme.mode === "light" ? 1.0 : 0.5;
  let directionalIntensity = theme.mode === "light" ? 0.3 : 0.2;

  // useHelper(pointLightRef, PointLightHelper, 1, "red");
  // useHelper(spotLightRef, SpotLightHelper, "blue");
  // useHelper(dirLightRef, DirectionalLightHelper, 1, "green");
  // useHelper(spotLightRef2, SpotLightHelper, "blue");
  // useHelper(dirLightRef2, DirectionalLightHelper, 1, "green");

  useFrame(({ scene }) => {
    if (hasMovedTarget) return;
    if (!spotLightRef.current || !spotLightRef2.current) return;
    scene.add(spotLightRef.current.target);
    spotLightRef.current.target.position.set(1, 4, 1);
    scene.add(spotLightRef2.current.target);
    spotLightRef2.current.target.position.set(0.5, 2, -2);
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
        position={[4, 10, 5]}
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
        intensity={directionalIntensity}
      />
      <spotLight
        ref={spotLightRef2}
        args={[0xffffff]}
        position={[1, 6, -5]}
        intensity={spotIntensity * 5}
        distance={15}
        penumbra={0.8}
        angle={Math.PI / 8}
        castShadow
      />
      <directionalLight
        ref={dirLightRef2}
        args={[0xffffff]}
        position={[0, 4, -4]}
        intensity={directionalIntensity * 2}
      />
    </>
  );
};
