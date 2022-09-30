import { useGLTF, useTexture } from "@react-three/drei";
import React, { useEffect } from "react";
import { MeshToonMaterial } from "three";
import { useTheme } from "../../contexts/theme";
import { applyNearestFilterToTextures } from "../../util/3d";

export const Workspace: React.FC = () => {
  const theme = useTheme();
  const gltf = useGLTF("/threejs/models/workspace.glb");
  const gradientTexLight = useTexture(
    "/threejs/textures/gradient-light.png",
    applyNearestFilterToTextures
  );
  const gradientTexDark = useTexture(
    "/threejs/textures/gradient-dark.png",
    applyNearestFilterToTextures
  );

  // Apply MeshToonMaterial
  const gradientTex =
    theme.mode === "light" ? gradientTexLight : gradientTexDark;
  useEffect(() => {
    gltf.scene.traverse((node: any) => {
      if ("receiveShadow" in node) {
        node.receiveShadow = true;
      }
      if (node.isMesh) {
        const oldMaterial = node.material;
        const newMaterial = new MeshToonMaterial();
        newMaterial.map = oldMaterial.map;
        newMaterial.gradientMap = gradientTex;
        node.material = newMaterial;
        console.log({ newMaterial, node });
      }
    });
  }, [gltf, gradientTex]);

  return (
    <primitive
      object={gltf.scene}
      position={[0, 0.1, -1]}
      rotation={[0, Math.PI, 0]}
    />
  );
};
