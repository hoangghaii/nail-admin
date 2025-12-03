import { create } from "zustand";

import type { HeroSettings, HeroDisplayMode } from "@/types/heroSettings.types";

const DEFAULT_HERO_SETTINGS: HeroSettings = {
  displayMode: "carousel",
  carouselInterval: 5000,
  showControls: true,
  updatedAt: new Date(),
};

type HeroSettingsState = {
  settings: HeroSettings;
  isInitialized: boolean;
  initializeSettings: () => void;
  updateSettings: (settings: Partial<Omit<HeroSettings, "updatedAt">>) => void;
  resetSettings: () => void;
  setDisplayMode: (mode: HeroDisplayMode) => void;
  setCarouselInterval: (interval: number) => void;
  setShowControls: (show: boolean) => void;
};

export const useHeroSettingsStore = create<HeroSettingsState>((set, get) => ({
  settings: DEFAULT_HERO_SETTINGS,
  isInitialized: false,

  initializeSettings: () => {
    if (!get().isInitialized) {
      set({ settings: DEFAULT_HERO_SETTINGS, isInitialized: true });
    }
  },

  updateSettings: (newSettings) => {
    set((state) => ({
      settings: {
        ...state.settings,
        ...newSettings,
        updatedAt: new Date(),
      },
    }));
  },

  resetSettings: () => {
    set({ settings: { ...DEFAULT_HERO_SETTINGS, updatedAt: new Date() } });
  },

  setDisplayMode: (mode) => {
    set((state) => ({
      settings: {
        ...state.settings,
        displayMode: mode,
        updatedAt: new Date(),
      },
    }));
  },

  setCarouselInterval: (interval) => {
    set((state) => ({
      settings: {
        ...state.settings,
        carouselInterval: interval,
        updatedAt: new Date(),
      },
    }));
  },

  setShowControls: (show) => {
    set((state) => ({
      settings: {
        ...state.settings,
        showControls: show,
        updatedAt: new Date(),
      },
    }));
  },
}));
