export const PALETTE = {
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

    letterBorder: "#454545",
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

export type Theme = keyof typeof PALETTE;

export const makeThemeCss = () => {
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
};
