import { useEffect, useRef, useState } from "react";

export function useUpdatingRef<T>(value: T) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref;
}

export function useHasRendered() {
  const [hasRendered, setHasRendered] = useState(false);
  useEffect(() => {
    setHasRendered(true);
  }, []);
  return hasRendered;
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handler = () => {
      setWindowSize(prev => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        if (prev.width === width && prev.height === height) return prev;
        return { width, height };
      });
    };
    window.addEventListener("resize", handler);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => {
      window.removeEventListener("resize", handler);
      window.removeEventListener("scroll", handler);
    };
  }, []);

  return windowSize;
}

export function useWindowScroll() {
  const [scroll, setScroll] = useState({ scrollX: 0, scrollY: 0 });

  useEffect(() => {
    const handler = () => {
      setScroll({ scrollX: window.scrollX, scrollY: window.scrollY });
    };
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    handler();
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  return scroll;
}
