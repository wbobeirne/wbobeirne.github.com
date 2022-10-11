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
