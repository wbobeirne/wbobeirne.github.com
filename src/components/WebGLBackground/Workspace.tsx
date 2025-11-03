import {
  Plane,
  useGLTF,
  useTexture,
  Html as DreiHtml,
  Image as DreiImage,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useLocation, useParams } from "@tanstack/react-router";
import React, { useEffect, useRef } from "react";
import {
  BufferGeometry,
  Material,
  Mesh,
  MeshToonMaterial,
  Object3D,
} from "three";
import { useTheme } from "~/store/theme";
import { applyNearestFilterToTextures } from "~/util/3d";
import { shouldRenderFakeOS } from "~/util/animation";
import { ProjectKey, PROJECTS } from "~/util/projects";
import FakeOSDark from "~public/threejs/textures/fakeos-dark.webp";
import FakeOSLight from "~public/threejs/textures/fakeos-light.webp";
import { FakeOS } from "./FakeOS";

interface WorkspaceProps {
  hasLoaded: boolean;
}

export const Workspace: React.FC<WorkspaceProps> = ({ hasLoaded }) => {
  const theme = useTheme((s) => s.theme);
  const project = useParams({
    strict: false,
    select: (p) => (p.projectId ? PROJECTS[p.projectId as ProjectKey] : null),
  });
  const isViewingProjects = useLocation({
    select: (l) => l.pathname.startsWith("/work"),
  });

  const sceneRef = useRef<Object3D>(null!);
  const gltf = useGLTF("/threejs/models/workspace.glb");
  const gradientTexLight = useTexture(
    "/threejs/textures/gradient-light.png",
    applyNearestFilterToTextures,
  );
  const gradientTexDark = useTexture(
    "/threejs/textures/gradient-dark.png",
    applyNearestFilterToTextures,
  );
  const fakeOsImageRef = useRef<Mesh<BufferGeometry, Material> | null>(null);

  // Apply MeshToonMaterial to workspace
  const gradientTex = theme === "light" ? gradientTexLight : gradientTexDark;
  useEffect(() => {
    gltf.scene.traverse((node) => {
      if ("receiveShadow" in node) {
        node.receiveShadow = true;
      }
      if ("isMesh" in node && (node as Mesh).isMesh) {
        const oldMaterial = (node as Mesh).material as Material;
        const newMaterial = new MeshToonMaterial();
        newMaterial.map = (oldMaterial as MeshToonMaterial).map;
        newMaterial.gradientMap = gradientTex;
        (node as Mesh).material = newMaterial;
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
        {isViewingProjects && shouldRenderFakeOS() ? (
          <DreiHtml transform occlude={[sceneRef]}>
            <FakeOS project={project} />
          </DreiHtml>
        ) : hasLoaded ? (
          <DreiImage
            ref={fakeOsImageRef}
            url={theme === "light" ? FakeOSLight : FakeOSDark}
            scale={[0.88, 0.46]}
          />
        ) : null}
      </Plane>
    </>
  );
};
