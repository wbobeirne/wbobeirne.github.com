import "../styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import { Nav } from "../components/Nav";
import { WebGLBackground } from "../components/WebGLBackground";

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const url = `https://wbobeirne.com/${router.route}`;
  return (
    <>
      <Nav />
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component {...pageProps} canonical={url} key={url} />
      </AnimatePresence>
      <WebGLBackground />
    </>
  );
};

export default MyApp;
