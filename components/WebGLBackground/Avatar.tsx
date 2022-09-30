import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { AnimationMixer, LoopOnce, MeshToonMaterial } from "three";
import { useTheme } from "../../contexts/theme";
import { applyNearestFilterToTextures } from "../../util/3d";

export const Avatar: React.FC = () => {
  const theme = useTheme();
  const gltf = useGLTF("/threejs/models/will-rigify.glb");
  const gradientTexLight = useTexture(
    "/threejs/textures/gradient-light.png",
    applyNearestFilterToTextures
  );
  const gradientTexDark = useTexture(
    "/threejs/textures/gradient-dark.png",
    applyNearestFilterToTextures
  );
  const mixer = useRef<AnimationMixer>();

  // Apply MeshToonMaterial
  const gradientTex =
    theme.mode === "light" ? gradientTexLight : gradientTexDark;
  useEffect(() => {
    gltf.scene.traverse((node: any) => {
      node.frustumCulled = false;
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

  // Start initial animation
  useEffect(() => {
    const vaultAnim = gltf.animations.find((a) => a.name === "VaultAndSit");
    if (!vaultAnim) return;
    mixer.current = new AnimationMixer(gltf.scene);
    const action = mixer.current.clipAction(vaultAnim);
    action.setLoop(LoopOnce, 1);
    action.clampWhenFinished = true;
    action.enabled = true;
    action.play();
  }, [gltf]);

  useFrame((_, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });

  return <primitive object={gltf.scene} position={[0.9, 3.46, 0.5]} />;
};
