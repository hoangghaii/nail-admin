# Banner CRUD Cleanup - Implementation Guide

This guide provides exact code changes needed to remove unnecessary fields from Banner and HeroSettings types.

---

## Change Summary

### Fields to Remove

1. **Banner.description** - optional field for banner description
2. **Banner.ctaText** - optional field for call-to-action button text
3. **Banner.ctaLink** - optional field for call-to-action button link
4. **HeroSettings.autoPlay** - boolean field for auto-playing carousel/video

### Files to Modify

- `src/types/banner.types.ts`
- `src/types/heroSettings.types.ts`
- `src/components/banners/BannerFormModal.tsx`
- `src/pages/BannersPage.tsx`
- `src/components/banners/HeroSettingsCard.tsx`
- `src/components/banners/DeleteBannerDialog.tsx`
- `src/services/heroSettings.service.ts`
- `src/data/mockBanners.ts`
- `src/data/initializeMockData.ts`

---

## File-by-File Changes

### 1. src/types/banner.types.ts

**Current** (14 lines):

```typescript
export type Banner = {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  videoUrl?: string;
  ctaText?: string;
  ctaLink?: string;
  sortIndex: number;
  active: boolean;
  isPrimary: boolean;
  createdAt: Date;
  updatedAt: Date;
};
```

**Change**: Remove lines 4, 7-8

**New** (11 lines):

```typescript
export type Banner = {
  id: string;
  title: string;
  imageUrl: string;
  videoUrl?: string;
  sortIndex: number;
  active: boolean;
  isPrimary: boolean;
  createdAt: Date;
  updatedAt: Date;
};
```

---

### 2. src/types/heroSettings.types.ts

**Current** (16 lines):

```typescript
export const HERO_DISPLAY_MODES = {
  IMAGE: "image",
  VIDEO: "video",
  CAROUSEL: "carousel",
} as const;

export type HeroDisplayMode =
  (typeof HERO_DISPLAY_MODES)[keyof typeof HERO_DISPLAY_MODES];

export type HeroSettings = {
  displayMode: HeroDisplayMode;
  carouselInterval: number;
  autoPlay: boolean;
  showControls: boolean;
  updatedAt: Date;
};
```

**Change**: Remove line 13 (autoPlay field)

**New** (15 lines):

```typescript
export const HERO_DISPLAY_MODES = {
  IMAGE: "image",
  VIDEO: "video",
  CAROUSEL: "carousel",
} as const;

export type HeroDisplayMode =
  (typeof HERO_DISPLAY_MODES)[keyof typeof HERO_DISPLAY_MODES];

export type HeroSettings = {
  displayMode: HeroDisplayMode;
  carouselInterval: number;
  showControls: boolean;
  updatedAt: Date;
};
```

---

### 3. src/components/banners/BannerFormModal.tsx

**Change**: Remove validation for removed fields, remove form inputs, update default values

**Location 1** - Zod schema (lines 27-39):

Remove:

```typescript
  ctaLink: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  ctaText: z
    .string()
    .max(30, "CTA text must be 30 characters or less")
    .optional(),
  description: z
    .string()
    .max(500, "Description must be 500 characters or less")
    .optional(),
```

**Location 2** - defaultValues (lines 74-82):

Remove:

```typescript
      ctaLink: "",
      ctaText: "",
      description: "",
```

**Location 3** - useEffect reset for edit mode (lines 92-100):

Remove:

```typescript
        ctaLink: banner.ctaLink || "",
        ctaText: banner.ctaText || "",
        description: banner.description || "",
```

**Location 4** - useEffect reset for create mode (lines 102-110):

Remove:

```typescript
        ctaLink: "",
        ctaText: "",
        description: "",
```

**Location 5** - onSubmit edit case (lines 118-126):

Remove:

```typescript
          ctaLink: data.ctaLink || undefined,
          ctaText: data.ctaText || undefined,
          description: data.description || undefined,
```

**Location 6** - onSubmit create case (lines 134-144):

Remove:

```typescript
          ctaLink: data.ctaLink || undefined,
          ctaText: data.ctaText || undefined,
          description: data.description || undefined,
```

**Location 7** - UI section for Description (lines 196-210):

Remove entire div:

```typescript
            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter banner description... (optional)"
                rows={3}
                {...register("description")}
              />
              {errors.description && (
                <p className="text-xs text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>
```

**Location 8** - UI section for CTA Text (lines 247-260):

Remove entire div:

```typescript
            {/* CTA Text */}
            <div className="space-y-2">
              <Label htmlFor="ctaText">Call-to-Action Text</Label>
              <Input
                id="ctaText"
                placeholder="e.g., Book Now, Learn More... (optional)"
                {...register("ctaText")}
              />
              {errors.ctaText && (
                <p className="text-xs text-destructive">
                  {errors.ctaText.message}
                </p>
              )}
            </div>
```

**Location 9** - UI section for CTA Link (lines 262-276):

Remove entire div:

```typescript
            {/* CTA Link */}
            <div className="space-y-2">
              <Label htmlFor="ctaLink">Call-to-Action Link</Label>
              <Input
                id="ctaLink"
                placeholder="https://example.com (optional)"
                type="url"
                {...register("ctaLink")}
              />
              {errors.ctaLink && (
                <p className="text-xs text-destructive">
                  {errors.ctaLink.message}
                </p>
              )}
            </div>
```

---

### 4. src/pages/BannersPage.tsx

**Change**: Remove ctaText display from title column, remove description column

**Location 1** - Title column (lines 167-171):

Remove:

```typescript
          {row.original.ctaText && (
            <p className="text-xs text-muted-foreground">
              CTA: {row.original.ctaText}
            </p>
          )}
```

**Location 2** - Description column definition (lines 177-184):

Remove entire object:

```typescript
    {
      accessorKey: "description",
      cell: ({ row }) => (
        <p className="max-w-md truncate text-sm text-muted-foreground">
          {row.original.description || "—"}
        </p>
      ),
      header: "Description",
    },
```

---

### 5. src/components/banners/HeroSettingsCard.tsx

**Change**: Remove autoPlay field from schema, watchers, defaults, and UI

**Location 1** - Zod schema (line 32):

Remove:

```typescript
  autoPlay: z.boolean(),
```

**Location 2** - defaultValues (line 56):

Remove:

```typescript
      autoPlay: true,
```

**Location 3** - Watcher (line 65):

Remove:

```typescript
const autoPlay = watch("autoPlay");
```

**Location 4** - First setValue in loadData (line 79):

Remove:

```typescript
setValue("autoPlay", settings.autoPlay);
```

**Location 5** - setValue in saveSettings (line 100):

Remove:

```typescript
        autoPlay: data.autoPlay,
```

**Location 6** - setValue in handleReset (line 128):

Remove:

```typescript
setValue("autoPlay", settings.autoPlay);
```

**Location 7** - Entire Auto Play UI section (lines 367-381):

Remove entire div:

```typescript
              {/* Auto Play */}
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="autoPlay">Auto Play</Label>
                  <p className="text-xs text-muted-foreground">
                    {displayMode === HERO_DISPLAY_MODES.CAROUSEL
                      ? "Automatically transition between slides"
                      : "Automatically play video background"}
                  </p>
                </div>
                <Switch
                  id="autoPlay"
                  checked={autoPlay}
                  onCheckedChange={(checked) => setValue("autoPlay", checked)}
                />
              </div>
```

---

### 6. src/components/banners/DeleteBannerDialog.tsx

**Change**: Remove description display from preview

**Location** - Delete dialog preview (lines 77-80):

Remove:

```typescript
                {banner.description && (
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {banner.description}
                  </p>
                )}
```

---

### 7. src/services/heroSettings.service.ts

**Change**: Remove autoPlay from default settings

**Location** - DEFAULT_SETTINGS object (line 12):

Remove:

```typescript
    autoPlay: true,
```

**Updated DEFAULT_SETTINGS**:

```typescript
  private readonly DEFAULT_SETTINGS: HeroSettings = {
    displayMode: HERO_DISPLAY_MODES.CAROUSEL,
    carouselInterval: 5000,
    showControls: true,
    updatedAt: new Date(),
  };
```

---

### 8. src/data/mockBanners.ts

**Change**: Remove description, ctaText, ctaLink from all 5 mock banners

**Banner 1** (lines 7, 10-11):
Remove:

```typescript
    description: "Experience luxury nail care with our premium services",
    ctaText: "Book Now",
    ctaLink: "/booking",
```

**Banner 2** (lines 21, 24-25):
Remove:

```typescript
    description: "Get 20% off all services this December",
    ctaText: "View Offers",
    ctaLink: "/services",
```

**Banner 3** (lines 35, 38-39):
Remove:

```typescript
    description: "Discover our latest designs and trending styles",
    ctaText: "Explore Gallery",
    ctaLink: "/gallery",
```

**Banner 4** (lines 49, 52-53):
Remove:

```typescript
    description: "Relax and rejuvenate with our spa packages",
    ctaText: "Learn More",
    ctaLink: "/services",
```

**Banner 5** (lines 63, 66-67):
Remove:

```typescript
    description: "Perfect gift for your loved ones this season",
    ctaText: "Buy Gift Card",
    ctaLink: "/gift-cards",
```

---

### 9. src/data/initializeMockData.ts

**Change**: Remove autoPlay from hero_settings default

**Location** - hero_settings initialization (line 13):

Remove:

```typescript
      autoPlay: true,
```

**Updated initialization**:

```typescript
storage.set("hero_settings", {
  displayMode: "carousel",
  carouselInterval: 5000,
  showControls: true,
  updatedAt: new Date(),
});
```

---

## Implementation Order

1. **Update type definitions** (2 files)
   - Changes are atomic, no dependencies on other updates

2. **Update service layer** (1 file)
   - Depends on type definitions

3. **Update form component** (1 file)
   - Depends on type definitions and form schema

4. **Update display components** (3 files)
   - Depends on type definitions

5. **Update mock data** (2 files)
   - Depends on type definitions

6. **Test & verify**
   - TypeScript compilation
   - Mock data initialization
   - CRUD operations

---

## Testing Checklist

After making changes:

- [ ] `npm run build` completes successfully
- [ ] `npx tsc --noEmit` shows no type errors
- [ ] Mock data initializes without errors
- [ ] Create banner form works (3 fields removed)
- [ ] Edit banner form works with existing data
- [ ] Banner table displays correctly
- [ ] Delete dialog displays correctly
- [ ] Hero settings card saves correctly
- [ ] Fresh localStorage initialization works
- [ ] Old localStorage data is migrated/reset

---

## Rollback Plan

If issues occur after deployment:

1. Git diff to see changes: `git diff src/`
2. Revert specific files: `git checkout src/types/banner.types.ts`
3. Or full revert: `git revert <commit-hash>`
4. Clear localStorage in development: `localStorage.clear()`

---

## Notes

- **No breaking changes to bannersService** - it accepts Partial types
- **No API endpoint changes** - dual-mode service layer handles migration
- **Safe to test in mock mode** - real API mode can be updated separately
- **Data migration** - Hard reset recommended for pre-release software
- **Type safety** - TypeScript will catch any missed references after changes

---

**Last Updated**: 2025-12-03
**Estimated Implementation Time**: 2-3 hours
**Testing Time**: 1-2 hours
