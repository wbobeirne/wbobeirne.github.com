import { useThree } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Vector3 } from "three";
import { FlyControls, OrbitControls } from "@react-three/drei";
import { useAppContext } from "../../contexts/app";
import { CameraControls } from "./CameraControls";

const ZOOM_MULTIPLIER = 50;
const POSITION_MULTIPLIER = 1;

const makeZoom = (zoom: number, width: number, height: number) =>
  zoom * ZOOM_MULTIPLIER;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

interface CameraProps {
  pathname: string;
}

export const Camera: React.FC<CameraProps> = ({ pathname }) => {
  const { activeProject, debug } = useAppContext();
  const camConRef = useRef<CameraControls | null>(null);
  const width = useThree((s) => s.size.width);
  const height = useThree((s) => s.size.height);
  const [mouseX, setMouseX] = useState(0); // -1 to 1
  const [mouseY, setMouseY] = useState(0); // -1 to 1

  const pageConfigs = useMemo(() => {
    const aspect = width / height;
    return [
      {
        route: "/bio",
        position: new Vector3(
          1 - clamp(aspect * 0.5, 0, 1) * POSITION_MULTIPLIER,
          2.2 + clamp(aspect * 5, 0, 2) * POSITION_MULTIPLIER,
          10 * POSITION_MULTIPLIER
        ),
        target: new Vector3(
          1 - clamp(aspect * 0.5, 0, 1),
          2 + clamp(aspect * 5, 0, 2),
          0
        ),
        positionWiggle: 0.1,
        targetWiggle: 0.05,
        zoom: makeZoom(0 + clamp(aspect * 5, 2, 10), width, height),
      },
      {
        route: "/work",
        position: activeProject
          ? new Vector3(1.2, 1.9, -5)
          : new Vector3(0.6, 1.8, -10),
        target: activeProject
          ? new Vector3(0.2, 1.4, -1)
          : new Vector3(0, 1.1, -1),
        positionWiggle: 0.1,
        targetWiggle: 0.05,
        zoom: makeZoom(
          activeProject ? aspect * 10 : clamp(aspect * 4, 4, 8),
          width,
          height
        ),
      },
      {
        route: "/blog",
        position: new Vector3(10, 4.35, -0.75),
        target: new Vector3(2.2, 4.15, 1),
        positionWiggle: 0.15,
        targetWiggle: 0,
        zoom: makeZoom(0 + clamp(aspect * 5, 2, 10), width, height),
      },
      {
        route: "/",
        position: new Vector3(
          8 * POSITION_MULTIPLIER,
          5 * POSITION_MULTIPLIER,
          10 * POSITION_MULTIPLIER
        ),
        target: new Vector3(0, 1.8, 0),
        positionWiggle: 1,
        targetWiggle: 0.1,
        zoom: makeZoom(clamp(aspect * 0.9, 0.5, 2), width, height),
      },
    ];
  }, [width, height, activeProject]);

  const pageConfig = useMemo(() => {
    const conf = pageConfigs.find(({ route }) => pathname.startsWith(route));
    return conf || pageConfigs[pageConfigs.length - 1];
  }, [pageConfigs, pathname]);

  useEffect(() => {
    if (!camConRef.current) return;
    camConRef.current.enabled = false;
    camConRef.current.dampingFactor = 0.05;
  }, []);

  useEffect(() => {
    if (!camConRef.current) return;
    camConRef.current.setLookAt(
      pageConfig.position.x + mouseX * pageConfig.positionWiggle,
      pageConfig.position.y + mouseY * pageConfig.positionWiggle,
      pageConfig.position.z,
      pageConfig.target.x + mouseX * pageConfig.targetWiggle,
      pageConfig.target.y + mouseY * pageConfig.targetWiggle,
      pageConfig.target.z,
      true
    );
    camConRef.current.zoomTo(pageConfig.zoom, true);
  }, [pageConfig, mouseX, mouseY]);

  useEffect(() => {
    if (!camConRef.current) return;
    const handle = (ev: MouseEvent) => {
      setMouseX((ev.clientX / window.innerWidth) * 2 - 1);
      setMouseY((ev.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  if (debug) {
    return <OrbitControls domElement={document.body} />;
  }

  return <CameraControls ref={camConRef} />;
};
