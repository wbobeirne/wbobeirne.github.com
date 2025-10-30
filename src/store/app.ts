import { create } from "zustand";

interface AppState {
  debug: boolean;

  stickyNavTop: number;
  setStickyNavTop: (top: number) => void;

  isUiHidden: boolean;
  toggleUiHidden: () => void;
}

export const useApp = create<AppState>((set) => ({
  debug: false,

  stickyNavTop: 0,
  setStickyNavTop: (stickyNavTop) => set({ stickyNavTop }),

  isUiHidden: false,
  toggleUiHidden: () => set(({ isUiHidden }) => ({ isUiHidden: !isUiHidden })),
}));
