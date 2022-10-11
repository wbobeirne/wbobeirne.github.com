import "../styles/global.scss";
import React from "react";
import type { AppProps } from "next/app";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { Nav } from "../components/Nav";
import { WebGLBackground } from "../components/WebGLBackground";
import { ThemeProvider } from "../contexts/theme";
import { AppProvider } from "../contexts/app";
import { NoScriptBackground } from "../components/NoScriptBackground";

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const url = `https://wbobeirne.com/${router.route}`;
  return (
    <NextThemesProvider>
      <ThemeProvider>
        <AppProvider>
          <Nav />
          <SwitchTransition>
            <CSSTransition
              key={router.pathname}
              classNames="page"
              timeout={300}
            >
              <Component {...pageProps} canonical={url} key={url} />
            </CSSTransition>
          </SwitchTransition>
          <WebGLBackground />
          <NoScriptBackground />
        </AppProvider>
      </ThemeProvider>
    </NextThemesProvider>
  );
};

export default MyApp;
