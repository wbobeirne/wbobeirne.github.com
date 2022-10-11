import { useThree } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Vector3 } from "three";
import { OrbitControls } from "@react-three/drei";
import { useAppContext } from "../../contexts/app";
import { CameraControls } from "./CameraControls";
import { shouldRenderFakeOS } from "../../util/animation";

const ZOOM_MULTIPLIER = 50;

const makeZoom = (zoom: number, width: number, height: number) =>
  zoom * ZOOM_MULTIPLIER * Math.min(width / 1000, height / 1000);

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

interface CameraProps {
  pathname: string;
}

export const Camera: React.FC<CameraProps> = ({ pathname }) => {
  const { activeProject, debug, isUiHidden } = useAppContext();
  const camConRef = useRef<CameraControls | null>(null);
  const width = useThree((s) => s.size.width);
  const height = useThree((s) => s.size.height);
  const [mouseX, setMouseX] = useState(0); // -1 to 1
  const [mouseY, setMouseY] = useState(0); // -1 to 1
  const isAnimatedRef = useRef(true);

  const isZoomedOnMonitor = activeProject && shouldRenderFakeOS();
  const pageConfigs = useMemo(() => {
    const aspect = width / height;
    const isMobile = width < 880;
    const widthOffset = isMobile || isUiHidden ? 1 : (width - 820) / width;
    return [
      {
        route: "/bio",
        position: isMobile
          ? new Vector3(0.85, 3.9, 10)
          : new Vector3(
              0 + widthOffset * 1.0,
              2.5 + clamp(aspect * 5, 0, 2),
              10
            ),
        target: isMobile
          ? new Vector3(0.85, 3.5, 0)
          : new Vector3(
              -0.6 + widthOffset * 1.0,
              2 + clamp(aspect * 5, 0, 2),
              0
            ),
        positionWiggle: 0.1,
        targetWiggle: 0.05,
        zoom: makeZoom(
          isMobile ? 12 : 0 + clamp(aspect * 5, 2, 10),
          width,
          height
        ),
      },
      {
        route: "/work",
        position: isMobile
          ? new Vector3(0.5, 3.4 - aspect * 2.8, -5)
          : isZoomedOnMonitor
          ? new Vector3(2.3 - clamp(widthOffset * 1.8, 0, 100), 1.9, -5)
          : new Vector3(3.4 - clamp(widthOffset * 2.1, 0, 100), 1.8, -10),
        target: isMobile
          ? new Vector3(0, 2.9 - aspect * 2.8, -1)
          : isZoomedOnMonitor
          ? new Vector3(1.3 - clamp(widthOffset * 1.8, 0, 100), 1.4, -1)
          : new Vector3(1.8 - clamp(widthOffset * 2.1, 0, 100), 1.1, -1),
        positionWiggle: isZoomedOnMonitor ? 0.05 : 0.1,
        targetWiggle: isZoomedOnMonitor ? 0.025 : 0.05,
        zoom: makeZoom(
          isMobile
            ? 6
            : isZoomedOnMonitor
            ? aspect * 10
            : clamp(aspect * 4, 4, 8),
          width,
          height
        ),
      },
      {
        route: "/blog",
        position: new Vector3(9 - widthOffset * 9, 4.35, -10),
        target: new Vector3(9 - widthOffset * 9, 4.15, 1),
        positionWiggle: 0,
        targetWiggle: 0.04,
        zoom: makeZoom(0.2 + clamp(aspect * 1, 2, 10), width, height),
      },
      {
        route: "/",
        position: new Vector3(8, 5, 10),
        target: new Vector3(0, 1.8, 0),
        positionWiggle: 0.3,
        targetWiggle: 0.05,
        zoom: makeZoom(clamp(aspect * 0.9, 1.2, 4), width, height),
      },
    ];
  }, [width, height, isZoomedOnMonitor, isUiHidden]);

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
      isAnimatedRef.current
    );
    camConRef.current.zoomTo(pageConfig.zoom, isAnimatedRef.current);
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

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    window.addEventListener("resize", () => {
      if (timeout) clearTimeout(timeout);
      isAnimatedRef.current = false;
      timeout = setTimeout(() => {
        isAnimatedRef.current = true;
      });
    });
  }, []);

  if (debug) {
    return <OrbitControls domElement={document.body} />;
  }

  return <CameraControls ref={camConRef} />;
};
