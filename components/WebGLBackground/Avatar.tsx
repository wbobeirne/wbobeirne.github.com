import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import {
  AnimationAction,
  AnimationMixer,
  LoopOnce,
  MeshToonMaterial,
} from "three";
import { useTheme } from "../../contexts/theme";
import { applyNearestFilterToTextures } from "../../util/3d";

interface AvatarProps {
  waving: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({ waving }) => {
  const theme = useTheme();
  const gltf = useGLTF("/threejs/models/will-rigify3-compressed.glb");
  const gradientTexLight = useTexture(
    "/threejs/textures/gradient-light.png",
    applyNearestFilterToTextures,
  );
  const gradientTexDark = useTexture(
    "/threejs/textures/gradient-dark.png",
    applyNearestFilterToTextures,
  );
  const [mixer, setMixer] = useState<AnimationMixer>();
  const [hasEntered, setHasEntered] = useState(false);
  const [opacity, setOpacity] = useState(0.0);

  const scene = gltf.scene;
  const vaultAnim = gltf.animations.find((a) => a.name === "VaultAndSit");
  const waveAnim = gltf.animations.find((a) => a.name === "SitAndWave");

  // Apply MeshToonMaterial
  const gradientTex =
    theme.mode === "light" ? gradientTexLight : gradientTexDark;
  useEffect(() => {
    if (!scene) return;
    scene.traverse((node: any) => {
      node.frustumCulled = false;
      if ("receiveShadow" in node) {
        node.receiveShadow = true;
      }
      if (node.isMesh) {
        const oldMaterial = node.material;
        const newMaterial = new MeshToonMaterial();
        newMaterial.map = oldMaterial.map;
        newMaterial.gradientMap = gradientTex;
        newMaterial.opacity = 0;
        newMaterial.transparent = true;
        node.material = newMaterial;
      }
    });
  }, [scene, gradientTex]);

  // Setup animation mixer
  useEffect(() => {
    const mixer = new AnimationMixer(scene);
    setMixer(mixer);
  }, [scene]);

  // Start initial animation, unhide model
  useEffect(() => {
    if (!vaultAnim || !mixer) return;
    const action = mixer.clipAction(vaultAnim);
    action.setLoop(LoopOnce, 1);
    action.clampWhenFinished = true;
    action.enabled = true;
    action.play();
    action.paused = true;
    const to1 = setTimeout(() => {
      action.paused = false;
      setOpacity(1);
    }, 500);
    const to2 = setTimeout(() => {
      setHasEntered(true);
    }, 3000);
    return () => {
      clearTimeout(to1);
      clearTimeout(to2);
    };
  }, [scene, vaultAnim, mixer]);

  // Wave when we ought to
  useEffect(() => {
    if (!waving || !waveAnim || !mixer || !hasEntered) return;
    const existingAction = mixer.existingAction(waveAnim);
    let action: AnimationAction;
    if (existingAction) {
      if (existingAction.paused) {
        action = existingAction;
      } else {
        return;
      }
    } else {
      action = mixer.clipAction(waveAnim);
      action.setLoop(LoopOnce, 1);
      action.clampWhenFinished = true;
      action.enabled = true;
    }
    const timeout = setTimeout(() => {
      mixer.stopAllAction();
      action.play();
    }, 250);
    return () => clearTimeout(timeout);
  }, [waving, waveAnim, mixer, hasEntered]);

  useFrame((_, delta) => {
    // Update animation mixer
    if (mixer) mixer.update(delta);

    // Update opacity
    scene.traverse((node: any) => {
      if (node.isMesh) {
        node.material.transparent = opacity !== 1;
        node.material.opacity = opacity;
      }
    });
  });

  return <primitive object={scene} position={[0.9, 3.46, 0.5]} />;
};
