import { useThree } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Vector3 } from "three";
import { CameraControls } from "./CameraControls";

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
    console.log({ aspect });
    return [
      {
        route: "/bio",
        position: new Vector3(2.2 - clamp(aspect * 0.5, 0, 1), 4.3, 4),
        target: new Vector3(2.2 - clamp(aspect * 0.5, 0, 1), 4, 0),
        positionWiggle: 0.1,
        targetWiggle: 0,
        zoom: clamp(aspect * 0.9, 1, 2),
      },
      {
        route: "/work",
        position: new Vector3(0, 1.8, -5),
        target: new Vector3(0, 1.1, 0),
        positionWiggle: 0.1,
        targetWiggle: 0,
        zoom: clamp(aspect * 0.9, 1, 2),
      },
      {
        route: "/blog",
        position: new Vector3(0, 4.35, -4.5),
        target: new Vector3(0, 4.35, 0),
        positionWiggle: 0.5,
        targetWiggle: -0.1,
        zoom: clamp(aspect * 0.9, 1, 2),
      },
      {
        route: "/",
        position: new Vector3(8, 5, 12),
        target: new Vector3(2.1, 1.8, 0),
        positionWiggle: 0.5,
        targetWiggle: 0,
        zoom: clamp(aspect * 0.9, 0.5, 2),
      },
    ];
  }, [width, height]);

  const pageConfig = useMemo(() => {
    const conf = pageConfigs.find(({ route }) => pathname.startsWith(route));
    return conf || pageConfigs[pageConfigs.length - 1];
  }, [pageConfigs, pathname]);

  useEffect(() => {
    camConRef.current.enabled = false;
    camConRef.current.dampingFactor = 0.12;
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
