import { useMotionValue } from "framer-motion";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const PALETTE = {
  light: {
    colorScheme: "light",
    text: "#000000",
    textInvert: "#FFFFFF",
    background: "#FFFFFF",
    backgroundShaded: "#DDDDDD",
    shadowLight: "#DDDDDD",
    shadowDark: "#CCCCCC",
  },
  dark: {
    colorScheme: "dark",
    text: "#FFFFFF",
    textInvert: "#000000",
    background: "#2c2d28",
    backgroundShaded: "#090806",
    shadowLight: "#2c2d28",
    shadowDark: "#393b36",
  },
};

type ThemeMode = keyof typeof PALETTE;

const initialState = {
  mode: "light" as ThemeMode,
  palette: PALETTE.light,
  toggleMode: () => null,
};

function getTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export const ThemeContext = React.createContext(initialState);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState(getTheme());
  const palette = PALETTE[mode];
  const toggleMode = useCallback(() => {
    document.body.classList.add("isChangingTheme");
    requestAnimationFrame(() => {
      setMode((mode) => (mode === "light" ? "dark" : "light"));
      setTimeout(() => {
        document.body.classList.remove("isChangingTheme");
      }, 200);
    });
    return null;
  }, []);
  const value = useMemo(
    () => ({ mode, toggleMode, palette }),
    [mode, toggleMode, palette]
  );

  // Listen to dark mode changes
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handle = () => setMode(getTheme());
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, []);

  const cssVars = useMemo(() => {
    const vars = Object.entries(palette)
      .map(([key, value]) => `--palette-${key}: ${value};`)
      .join("\r\n");
    return `
      :root {
        ${vars}
      }

      body.isChangingTheme * {
        transition: all 150ms ease !important;
      }
    `;
  }, [palette]);

  return (
    <ThemeContext.Provider value={value}>
      <style key={mode}>{cssVars}</style>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return React.useContext(ThemeContext);
};

export const useThemeMotion = () => {
  const theme = useTheme();
  const mv = useMotionValue(theme.mode === "light" ? 0 : 100);

  useEffect(() => {
    mv.set(theme.mode === "light" ? 0 : 100);
  }, [mv, theme.mode]);

  return mv;
};
