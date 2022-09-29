import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { AnimationMixer, LoopOnce, MeshToonMaterial } from "three";

export const Avatar: React.FC = () => {
  const gltf = useGLTF("/threejs/models/will-rigify.glb");
  const mixer = useRef<AnimationMixer>();

  // const threeTone = textureLoader.load(
  //   "../../examples/textures/gradientMaps/threeTone.jpg"
  // );
  // threeTone.minFilter = THREE.NearestFilter;
  // threeTone.magFilter = THREE.NearestFilter;

  useEffect(() => {
    console.log({ gltf });
    gltf.scene.traverse((node: any) => {
      node.frustumCulled = false;
      if ("receiveShadow" in node) {
        node.receiveShadow = true;
      }
      if (node.isMesh) {
        const oldMaterial = node.material;
        node.material = new MeshToonMaterial();
        node.material.map = oldMaterial.map;
      }
    });
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
