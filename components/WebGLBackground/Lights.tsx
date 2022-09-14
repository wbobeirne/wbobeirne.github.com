import React, { useEffect, useRef } from "react";
import { useHelper } from "@react-three/drei";
import { DirectionalLightHelper, PointLightHelper, Vector3 } from "three";

export const Lights: React.FC = () => {
  const dirLightRef = useRef<any>();
  const dirLightRef2 = useRef<any>();
  // useHelper(dirLightRef, DirectionalLightHelper, 1, "blue");
  // useHelper(dirLightRef2, DirectionalLightHelper, 1, "blue");

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight
        ref={dirLightRef}
        args={[0xffffff]}
        position={[0, 5, 4]}
        intensity={5}
      />
      <directionalLight
        ref={dirLightRef2}
        args={[0xffffff]}
        position={[0, 4, -4]}
        intensity={3}
      />
    </>
  );
};
