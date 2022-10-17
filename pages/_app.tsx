import "../styles/global.scss";
import type { AppProps } from "next/app";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { Nav } from "../components/Nav";
import { ThemeProvider } from "../contexts/theme";
import { AppProvider } from "../contexts/app";
import { NoScriptBackground } from "../components/NoScriptBackground";
import { fixTimeoutTransition } from "../util/animation";

const transitionTime = 300;
fixTimeoutTransition(transitionTime);

const WebGLBackground = dynamic(() => import("../components/WebGLBackground"), {
  suspense: true,
});

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const url = `https://wbobeirne.com/${router.route}`;
  console.log({ WebGLBackground });
  return (
    <NextThemesProvider>
      <ThemeProvider>
        <AppProvider>
          <Nav />
          <SwitchTransition>
            <CSSTransition
              key={router.pathname}
              classNames="page"
              timeout={transitionTime}
            >
              <Component {...pageProps} canonical={url} key={url} />
            </CSSTransition>
          </SwitchTransition>
          <Suspense>
            <WebGLBackground />
          </Suspense>
          <NoScriptBackground />
        </AppProvider>
      </ThemeProvider>
    </NextThemesProvider>
  );
};

export default MyApp;
