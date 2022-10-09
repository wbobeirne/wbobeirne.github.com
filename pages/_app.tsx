import "../styles/global.scss";
import React from "react";
import type { AppProps } from "next/app";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AnimatePresence } from "framer-motion";
import { Nav } from "../components/Nav";
import { WebGLBackground } from "../components/WebGLBackground";
import { ThemeProvider } from "../contexts/theme";
import { AppProvider } from "../contexts/app";

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const url = `https://wbobeirne.com/${router.route}`;
  return (
    <NextThemesProvider>
      <ThemeProvider>
        <AppProvider>
          <Nav />
          <AnimatePresence
            mode="wait"
            initial={false}
            onExitComplete={() => window.scrollTo(0, 0)}
          >
            <Component {...pageProps} canonical={url} key={url} />
          </AnimatePresence>
          <WebGLBackground />
        </AppProvider>
      </ThemeProvider>
    </NextThemesProvider>
  );
};

export default MyApp;
