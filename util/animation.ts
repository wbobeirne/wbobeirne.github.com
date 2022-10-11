export function dur(duration: number) {
  return duration * 1;
}

export function makeTransitionStyleClasses(styles: Record<string, string>) {
  return {
    enter: styles.enter,
    enterActive: styles.enterActive,
    exit: styles.exit,
    exitActive: styles.exitActive,
  };
}

export function shouldRenderFakeOS() {
  // Server side rendering
  if (typeof navigator === "undefined") return false;

  // Low cores as a heuristic for low spec device
  if (
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency < 4
  ) {
    return false;
  }

  // Low memory as a proxy for low spec device
  if (
    typeof (navigator as any).deviceMemory === "number" &&
    (navigator as any).deviceMemory < 4
  ) {
    return false;
  }

  // Mobile device
  if (window.innerWidth < 600) {
    return false;
  }

  // Firefox's Gecko engine renders the fake os poorly
  if (navigator.userAgent.includes("Gecko/")) {
    return false;
  }

  return true;
}
