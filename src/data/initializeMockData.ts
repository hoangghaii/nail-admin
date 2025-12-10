import { useBannersStore } from "@/store/bannersStore";
import { useBookingsStore } from "@/store/bookingsStore";
import { useGalleryStore } from "@/store/galleryStore";
import { useHeroSettingsStore } from "@/store/heroSettingsStore";

export function initializeMockData(): void {
  // Initialize banners store
  useBannersStore.getState().initializeBanners();

  // Initialize hero settings store
  useHeroSettingsStore.getState().initializeSettings();

  // Initialize gallery store
  useGalleryStore.getState().initializeGallery();

  // Initialize bookings store
  useBookingsStore.getState().initializeBookings();

  console.log("Mock data initialized successfully");
}
