import "../styles/global.scss";
import type { AppProps } from "next/app";
import React, { Suspense, useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { Nav } from "../components/Nav";
import { ThemeProvider } from "../contexts/theme";
import { AppProvider } from "../contexts/app";
import { NoScriptBackground } from "../components/NoScriptBackground";
import { fixTimeoutTransition } from "../util/animation";
import { LoaderBackground } from "../components/LoaderBackground";

const transitionTime = 300;
fixTimeoutTransition(transitionTime);

const WebGLBackground = dynamic(() => import("../components/WebGLBackground"), {
  suspense: true,
});

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const url = `https://wbobeirne.com/${router.route}`;
  const [webglLoaded, setWebglLoaded] = useState(false);

  const handleLoaded = useCallback(() => {
    setWebglLoaded(true);
  }, []);

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
            <WebGLBackground onLoaded={handleLoaded} />
          </Suspense>
          <LoaderBackground hasLoaded={router.route !== "/" || webglLoaded} />
          <NoScriptBackground />
        </AppProvider>
      </ThemeProvider>
    </NextThemesProvider>
  );
};

export default MyApp;
