import { ContactShadows, Plane, useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";

export const Workspace: React.FC = () => {
  const gltf = useGLTF("/threejs/models/workspace.glb");
  useEffect(() => {
    (gltf as any).materials["Material.003"].flatShading = true;
    (gltf as any).scene.traverse((node: any) => {
      if (node.isMesh) {
        node.castShadow = true;
      }
    });
  }, [gltf]);
  return (
    <primitive
      object={gltf.scene}
      position={[0, 0.1, -1]}
      rotation={[0, Math.PI, 0]}
    />
  );
};
