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
  const gltf = useGLTF("/threejs/models/will-rigify2.glb");
  const gradientTexLight = useTexture(
    "/threejs/textures/gradient-light.png",
    applyNearestFilterToTextures
  );
  const gradientTexDark = useTexture(
    "/threejs/textures/gradient-dark.png",
    applyNearestFilterToTextures
  );
  const [mixer, setMixer] = useState<AnimationMixer>();
  const [hasEntered, setHasEntered] = useState(false);

  const scene = gltf.scene;
  const vaultAnim = gltf.animations.find((a) => a.name === "VaultAndSit");
  const waveAnim = gltf.animations.find((a) => a.name === "SitAndWave");

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
      }
    });
  }, [gltf, gradientTex]);

  // Setup animation mixer
  useEffect(() => {
    const mixer = new AnimationMixer(scene);
    setMixer(mixer);
  }, [scene]);

  // Start initial animation
  useEffect(() => {
    if (!vaultAnim || !mixer) return;
    const action = mixer.clipAction(vaultAnim);
    console.log({ vaultAnim, action });
    action.setLoop(LoopOnce, 1);
    action.clampWhenFinished = true;
    action.enabled = true;
    action.play();
    setTimeout(() => {
      setHasEntered(true);
    }, 2500);
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
    if (mixer) mixer.update(delta);
  });

  return <primitive object={scene} position={[0.9, 3.46, 0.5]} />;
};
