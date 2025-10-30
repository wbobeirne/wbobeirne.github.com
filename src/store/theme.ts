import { create } from "zustand";
import { PALETTE, Theme } from "~/util/palette";

interface ThemeState {
  theme: Theme | undefined;
  toggleTheme: () => void;
}

export const useTheme = create<ThemeState>((set) => ({
  theme: undefined,
  toggleTheme: () =>
    set(({ theme }) => ({
      theme: theme === "light" ? "dark" : "light",
    })),
}));

export const selectPalette = (state: ThemeState) => {
  if (!state.theme) return PALETTE.light;
  return PALETTE[state.theme];
};
