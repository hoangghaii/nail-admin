import { useBannersStore } from "@/store/bannersStore";
import { useHeroSettingsStore } from "@/store/heroSettingsStore";

export function initializeMockData(): void {
  // Initialize banners store
  useBannersStore.getState().initializeBanners();

  // Initialize hero settings store
  useHeroSettingsStore.getState().initializeSettings();

  console.log("Mock data initialized successfully");
}
