import { Shadow, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { AnimationMixer } from "three";

export const Avatar: React.FC = () => {
  // const gltf = useGLTF("/threejs/models/will.glb");
  const gltf = useGLTF("/threejs/models/will-altlighting.glb");
  const mixer = useRef<AnimationMixer>();

  useEffect(() => {
    console.log(gltf);
    gltf.scene.castShadow = true;
    gltf.scene.traverse((node: any) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        node.geometry.computeVertexNormals();
      }
    });
    mixer.current = new AnimationMixer(gltf.scene);
    const action = mixer.current.clipAction(gltf.animations[2]);
    action.play();
  }, [gltf]);

  useFrame((_, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });

  return <primitive object={gltf.scene} position={[0.9, 3.4, 0.5]} />;
};
