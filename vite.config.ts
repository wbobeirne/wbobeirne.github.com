import { cloudflare } from "@cloudflare/vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
      "~public": path.resolve(__dirname, "public"),
    },
  },
  define: {
    "globalThis.Cloudflare.compatibilityFlags": {
      nodejs_compat: true,
    },
  },
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tsConfigPaths(),
    tanstackStart({
      spa: {
        enabled: true,
        // prerender: {
        //   enabled: true,
        //   crawlLinks: true,
        // },
      },
    }),
    viteReact(),
    svgr(),
  ],
});
