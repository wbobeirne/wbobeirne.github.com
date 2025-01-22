import "../styles/global.scss";
import type { AppProps } from "next/app";
import React, { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { Nav } from "../components/Nav";
import { ThemeProvider } from "../contexts/theme";
import { AppProvider } from "../contexts/app";
import { NoScriptBackground } from "../components/NoScriptBackground";
import { fixTimeoutTransition } from "../util/animation";
import { LoaderBackground } from "../components/LoaderBackground";
import OpengraphImage from "../public/og/image.jpg";

const transitionTime = 300;
fixTimeoutTransition(transitionTime);

const WebGLBackground = dynamic(() => import("../components/WebGLBackground"));

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const url = `https://wbobeirne.com/${router.route}`;
  const [webglLoaded, setWebglLoaded] = useState(false);
  const componentDivRef = useRef<HTMLDivElement | null>(null);

  const handleLoaded = useCallback(() => {
    setWebglLoaded(true);
  }, []);

  return (
    <NextThemesProvider>
      <ThemeProvider>
        <AppProvider>
          <Head>
            <meta property="og:image" content={OpengraphImage.src} />
          </Head>
          <Nav />
          <SwitchTransition>
            <CSSTransition
              key={router.pathname}
              classNames="page"
              timeout={transitionTime}
              nodeRef={componentDivRef}
            >
              <div ref={componentDivRef}>
                <Component {...pageProps} canonical={url} key={url} />
              </div>
            </CSSTransition>
          </SwitchTransition>
          <WebGLBackground onLoaded={handleLoaded} />
          <LoaderBackground hasLoaded={router.route !== "/" || webglLoaded} />
          <NoScriptBackground />
        </AppProvider>
      </ThemeProvider>
    </NextThemesProvider>
  );
};

export default MyApp;
