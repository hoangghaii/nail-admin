import type { HeroSettings } from "@/types/heroSettings.types";

import { useHeroSettingsStore } from "@/store/heroSettingsStore";

export class HeroSettingsService {
  private useMockApi = import.meta.env.VITE_USE_MOCK_API === "true";

  async getSettings(): Promise<HeroSettings> {
    if (this.useMockApi) {
      return useHeroSettingsStore.getState().settings;
    }

    const response = await fetch("/api/hero-settings");
    if (!response.ok) throw new Error("Failed to fetch hero settings");
    return response.json();
  }

  async updateSettings(
    data: Partial<Omit<HeroSettings, "updatedAt">>,
  ): Promise<HeroSettings> {
    if (this.useMockApi) {
      useHeroSettingsStore.getState().updateSettings(data);
      return useHeroSettingsStore.getState().settings;
    }

    const response = await fetch("/api/hero-settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update hero settings");
    return response.json();
  }

  async resetSettings(): Promise<HeroSettings> {
    if (this.useMockApi) {
      useHeroSettingsStore.getState().resetSettings();
      return useHeroSettingsStore.getState().settings;
    }

    return this.updateSettings({
      displayMode: "carousel",
      carouselInterval: 5000,
      showControls: true,
    });
  }
}

export const heroSettingsService = new HeroSettingsService();
