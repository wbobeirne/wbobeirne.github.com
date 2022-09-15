import { useThree } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Vector3 } from "three";
import { CameraControls } from "./CameraControls";

const ZOOM = 50;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

interface CameraProps {
  pathname: string;
}

export const Camera: React.FC<CameraProps> = ({ pathname }) => {
  const camConRef = useRef<CameraControls>(null!);
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
          1 - clamp(aspect * 0.5, 0, 1),
          2.2 + clamp(aspect * 5, 0, 2),
          3
        ),
        target: new Vector3(
          1 - clamp(aspect * 0.5, 0, 1),
          2 + clamp(aspect * 5, 0, 2),
          -10
        ),
        positionWiggle: 0.05,
        targetWiggle: 0,
        zoom: 5 + clamp(aspect * 5, 2, 10) * ZOOM,
      },
      {
        route: "/work",
        position: new Vector3(0, 1.8, -10),
        target: new Vector3(0, 1.1, -1),
        positionWiggle: 0.1,
        targetWiggle: 0.05,
        zoom: clamp(aspect * 4, 4, 8) * ZOOM,
      },
      {
        route: "/blog",
        position: new Vector3(2, 4.35, -10),
        target: new Vector3(2, 4.35, 0),
        positionWiggle: 0.15,
        targetWiggle: 0,
        zoom: 5 + clamp(aspect * 5, 2, 10) * ZOOM,
      },
      {
        route: "/",
        position: new Vector3(8, 5, 10),
        target: new Vector3(0, 1.8, 0),
        positionWiggle: 1,
        targetWiggle: 0.1,
        zoom: clamp(aspect * 0.9, 0.5, 2) * ZOOM,
      },
    ];
  }, [width, height]);

  const pageConfig = useMemo(() => {
    const conf = pageConfigs.find(({ route }) => pathname.startsWith(route));
    return conf || pageConfigs[pageConfigs.length - 1];
  }, [pageConfigs, pathname]);

  useEffect(() => {
    camConRef.current.enabled = false;
    camConRef.current.dampingFactor = 0.05;
  }, []);

  useEffect(() => {
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
    const handle = (ev: MouseEvent) => {
      setMouseX((ev.clientX / window.innerWidth) * 2 - 1);
      setMouseY((ev.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return <CameraControls ref={camConRef} />;
};
