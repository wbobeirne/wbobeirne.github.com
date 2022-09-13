import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { ThreeBG } from "../../lib/three-bg";
import styles from "./style.module.scss";

export const WebGLBackground: React.FC = () => {
  const { pathname } = useRouter();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const threeBgRef = useRef<ThreeBG | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    threeBgRef.current = new ThreeBG(canvas);
    threeBgRef.current;
  }, []);

  useEffect(() => {
    if (!threeBgRef.current) return;
    threeBgRef.current.updatePathname(pathname);
  }, [pathname]);

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} />
    </div>
  );
};
