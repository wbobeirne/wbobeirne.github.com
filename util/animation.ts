import Router from "next/router";

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

// See https://github.com/vercel/next.js/issues/17464#issuecomment-751267740
export const fixTimeoutTransition = (timeout: number): void => {
  Router.events.on("beforeHistoryChange", () => {
    // Create a clone of every <style> and <link> that currently affects the page. It doesn't matter
    // if Next.js is going to remove them or not since we are going to remove the copies ourselves
    // later on when the transition finishes.
    const nodes = document.querySelectorAll(
      "link[rel=stylesheet], style:not([media=x])"
    );
    const copies = Array.from(nodes).map(
      (el) => el.cloneNode(true) as HTMLElement
    );

    for (let copy of copies) {
      // Remove Next.js' data attributes so the copies are not removed from the DOM in the route
      // change process.
      copy.removeAttribute("data-n-p");
      copy.removeAttribute("data-n-href");

      // Add duplicated nodes to the DOM.
      document.head.appendChild(copy);
    }

    const handler = () => {
      // Emulate a `.once` method using `.on` and `.off`
      Router.events.off("routeChangeComplete", handler);

      window.setTimeout(() => {
        for (let copy of copies) {
          // Remove previous page's styles after the transition has finalized.
          document.head.removeChild(copy);
        }
      }, timeout);
    };

    Router.events.on("routeChangeComplete", handler);
  });
};
