import { useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import {
  AmbientLight,
  DirectionalLight,
  DirectionalLightHelper,
  PointLight,
  PointLightHelper,
  SpotLight,
  SpotLightHelper,
} from "three";
import { useApp } from "~/store/app";
import { useTheme } from "~/store/theme";

export const Lights: React.FC = () => {
  const theme = useTheme((s) => s.theme);
  const debug = useApp((s) => s.debug);
  const ambientLightRef = useRef<AmbientLight>(null!);
  const pointLightRef = useRef<PointLight>(null!);
  const spotLightRef = useRef<SpotLight>(null!);
  const dirLightRef = useRef<DirectionalLight>(null!);
  const spotLightRef2 = useRef<SpotLight>(null!);
  const dirLightRef2 = useRef<DirectionalLight>(null!);
  const [hasMovedTarget, setHasMovedTarget] = useState(false);

  const ambientIntensity = theme === "light" ? 1.5 : 1.0;
  const spotIntensity = theme === "light" ? 0.1 : 100.0;
  const frontDirIntensity = theme === "light" ? 2.6 : 0.8;
  const backDirIntensity = theme === "light" ? 1.3 : 0.8;

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
