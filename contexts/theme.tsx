import React, { useCallback, useMemo } from "react";
import { useTheme as useNextTheme } from "next-themes";

const PALETTE = {
  light: {
    colorScheme: "light",

    primary: "#D65A31",
    primaryFaded: "#CFA191",
    text: "#1E1E1E",
    textInvert: "#FFFFFF",

    background: "#FFFFFF",
    backgroundShaded: "#DDDDDD",
    surface: "#FFFFFF",

    shadowLight: "#DDDDDD",
    shadowDark: "#CCCCCC",

    letterBorder: "#FFFFFF",
    letterBack: "#EEEEEE",
  },
  dark: {
    colorScheme: "dark",

    primary: "#D65A31",
    primaryFaded: "#CFA191",
    text: "#FFFFFF",
    textInvert: "#000000",
    textShadow: "#444444",

    background: "#414141",
    backgroundShaded: "#313131",
    surface: "#212121",

    shadowLight: "#333333",
    shadowDark: "#2C2C2C",

    letterBorder: "#414141",
    letterBack: "#525252",
  },
  // darkBlue: {
  //   colorScheme: "dark",
  //   text: "#FFFFFF",
  //   textInvert: "#000000",
  //   background: "#1D2D50",
  //   backgroundShaded: "#1D2D50",
  //   shadowLight: "#2c2d28",
  //   shadowDark: "#393b36",
  //   letterBorder: "#133B5C",
  //   letterBack: "#1E5F74",
  // },
};

const themeCss = (() => {
  const makeVars = (palette: Record<string, string>) =>
    Object.entries(palette)
      .map(([key, value]) => `--palette-${key}: ${value};`)
      .join("\r\n");
  return `
    :root {
      ${makeVars(PALETTE.light)}
    }

    [data-theme=dark] {
      ${makeVars(PALETTE.dark)}
    }

    body.isChangingTheme * {
      transition: all 0ms ease !important;
    }
  `;
})();

type ThemeMode = keyof typeof PALETTE;

const initialState = {
  mode: undefined as ThemeMode | undefined,
  palette: undefined as (typeof PALETTE)[ThemeMode] | undefined,
  toggleMode: () => null,
};

export const ThemeContext = React.createContext(initialState);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { resolvedTheme: mode, setTheme } = useNextTheme();
  const palette = mode ? PALETTE[mode as ThemeMode] : undefined;
  const toggleMode = useCallback(() => {
    document.body.classList.add("isChangingTheme");
    requestAnimationFrame(() => {
      setTheme(mode === "light" ? "dark" : "light");
      setTimeout(() => {
        document.body.classList.remove("isChangingTheme");
      }, 200);
    });
    return null;
  }, [mode, setTheme]);

  const value = useMemo(
    () => ({ mode: mode as ThemeMode | undefined, toggleMode, palette }),
    [mode, toggleMode, palette],
  );

  return (
    <ThemeContext.Provider value={value}>
      <style>{themeCss}</style>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return React.useContext(ThemeContext);
};
