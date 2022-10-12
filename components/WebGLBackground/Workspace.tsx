import {
  Plane,
  useGLTF,
  useTexture,
  Html as DreiHtml,
  Image as DreiImage,
} from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import {
  BufferGeometry,
  Material,
  Mesh,
  MeshToonMaterial,
  Object3D,
} from "three";
import { useAppContext } from "../../contexts/app";
import { useTheme } from "../../contexts/theme";
import { applyNearestFilterToTextures } from "../../util/3d";
import { shouldRenderFakeOS } from "../../util/animation";
import { FakeOS } from "./FakeOS";

import FakeOSLight from "../../public/threejs/textures/fakeos-light.jpg";
import FakeOSDark from "../../public/threejs/textures/fakeos-dark.jpg";
import { useFrame } from "@react-three/fiber";

export const Workspace: React.FC = () => {
  const theme = useTheme();
  const { activeProject, isViewingProjects } = useAppContext();

  const sceneRef = useRef<Object3D>(null!);
  const gltf = useGLTF("/threejs/models/workspace.glb");
  const gradientTexLight = useTexture(
    "/threejs/textures/gradient-light.png",
    applyNearestFilterToTextures
  );
  const gradientTexDark = useTexture(
    "/threejs/textures/gradient-dark.png",
    applyNearestFilterToTextures
  );
  const fakeOsImageRef = useRef<Mesh<BufferGeometry, Material>>();

  // Apply MeshToonMaterial to workspace
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
      }
    });
  }, [gltf, gradientTex]);

  useFrame(() => {
    if (!fakeOsImageRef.current) return;
    fakeOsImageRef.current.material.depthTest = false;
  });

  return (
    <>
      <primitive
        object={gltf.scene}
        position={[0, 0.1, -1]}
        rotation={[0, Math.PI, 0]}
        ref={sceneRef}
      />
      <Plane
        args={[0.88, 0.46]}
        position={[0.01, 1.499, -1.28]}
        rotation={[Math.PI * 0.085, Math.PI, 0]}
      >
        <meshBasicMaterial color={0x3c3c3c} />
        {isViewingProjects && shouldRenderFakeOS() && false ? (
          <DreiHtml transform occlude={[sceneRef]}>
            <FakeOS activeProject={activeProject} />
          </DreiHtml>
        ) : (
          <DreiImage
            ref={(ref) => (fakeOsImageRef.current = ref as any)}
            url={theme.mode === "light" ? FakeOSLight.src : FakeOSDark.src}
            scale={[0.88, 0.46, 0.46] as any}
          />
        )}
      </Plane>
    </>
  );
};
