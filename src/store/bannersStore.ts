import { create } from "zustand";

import type { Banner } from "@/types/banner.types";

import { MOCK_BANNERS } from "@/data/mockBanners";

type BannersState = {
  banners: Banner[];
  isInitialized: boolean;
  initializeBanners: () => void;
  setBanners: (banners: Banner[]) => void;
  addBanner: (banner: Banner) => void;
  updateBanner: (id: string, data: Partial<Banner>) => void;
  deleteBanner: (id: string) => void;
  reorderBanners: (bannerIds: string[]) => void;
  toggleBannerActive: (id: string) => void;
  setPrimaryBanner: (id: string) => void;
};

export const useBannersStore = create<BannersState>((set, get) => ({
  banners: [],
  isInitialized: false,

  initializeBanners: () => {
    if (!get().isInitialized) {
      set({ banners: MOCK_BANNERS, isInitialized: true });
    }
  },

  setBanners: (banners) => {
    set({ banners });
  },

  addBanner: (banner) => {
    set((state) => ({
      banners: [...state.banners, banner],
    }));
  },

  updateBanner: (id, data) => {
    set((state) => ({
      banners: state.banners.map((banner) =>
        banner.id === id ? { ...banner, ...data, updatedAt: new Date() } : banner
      ),
    }));
  },

  deleteBanner: (id) => {
    set((state) => ({
      banners: state.banners.filter((banner) => banner.id !== id),
    }));
  },

  reorderBanners: (bannerIds) => {
    set((state) => {
      const bannerMap = new Map(state.banners.map((b) => [b.id, b]));
      const reorderedBanners = bannerIds
        .map((id, index) => {
          const banner = bannerMap.get(id);
          return banner ? { ...banner, sortIndex: index } : null;
        })
        .filter((b): b is Banner => b !== null);

      return { banners: reorderedBanners };
    });
  },

  toggleBannerActive: (id) => {
    set((state) => ({
      banners: state.banners.map((banner) =>
        banner.id === id
          ? { ...banner, active: !banner.active, updatedAt: new Date() }
          : banner
      ),
    }));
  },

  setPrimaryBanner: (id) => {
    set((state) => ({
      banners: state.banners.map((banner) =>
        banner.id === id
          ? { ...banner, isPrimary: true, updatedAt: new Date() }
          : { ...banner, isPrimary: false, updatedAt: new Date() }
      ),
    }));
  },
}));
