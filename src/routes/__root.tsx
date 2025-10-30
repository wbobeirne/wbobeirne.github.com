/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
  useLocation,
} from "@tanstack/react-router";
import "~/styles/global.scss";
import { Nav } from "~/components/Nav";
import WebGLBackground from "~/components/WebGLBackground";
import { LoaderBackground } from "~/components/LoaderBackground";
import { NoScriptBackground } from "~/components/NoScriptBackground";
import ogImage from "~public/og/image.jpg";
import { Template } from "~/components/Template";
import { makeThemeCss, Theme } from "~/util/palette";
import { useTheme } from "~/store/theme";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "WBO",
      },
      {
        name: "og:image",
        content: ogImage,
      },
    ],
    links: [{ rel: "icon", href: "/favicon.ico" }],
    styles: [
      {
        type: "text/css",
        children: makeThemeCss(),
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  const { pathname } = useLocation();
  const [webglLoaded, setWebglLoaded] = useState(false);
  const templateRef = useRef<HTMLDivElement | null>(null);
  const handleLoaded = useCallback(() => {
    setWebglLoaded(true);
  }, []);
  const theme = useTheme((s) => s.theme);

  // Initialize theme
  useLayoutEffect(() => {
    let theme = localStorage.getItem("theme") as Theme | undefined;
    if (!theme) {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    useTheme.setState({ theme });
  }, []);

  // Update body and save on theme change
  useLayoutEffect(() => {
    if (theme) {
      document.body.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <Nav />
        <Template ref={templateRef}>
          <Outlet />
        </Template>
        <WebGLBackground onLoaded={handleLoaded} />
        <LoaderBackground hasLoaded={pathname !== "/" || webglLoaded} />
        <NoScriptBackground />
        <Scripts />
      </body>
    </html>
  );
}
