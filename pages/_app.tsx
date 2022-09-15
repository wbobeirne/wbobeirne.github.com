import "../styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { Nav } from "../components/Nav";
import { WebGLBackground } from "../components/WebGLBackground";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Nav />
      <div style={{ display: "none" }}>
        <Component {...pageProps} />
      </div>
      <WebGLBackground />
    </>
  );
};

export default MyApp;
