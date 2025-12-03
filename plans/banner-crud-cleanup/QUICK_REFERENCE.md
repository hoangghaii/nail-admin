# Banner CRUD Cleanup - Quick Reference

## TL;DR

Remove 3 fields from Banner type and 1 field from HeroSettings type. Total: 9 files, ~85 changes.

---

## Issues & Solutions

### Issue #1: Banner Has Unnecessary Fields ✓

**Problem**: `description`, `ctaText`, `ctaLink` don't belong in Banner type

**Solution**: Remove these 3 optional fields from Banner type definition

**Files affected**: 7 files
- Type definition
- Form validation + UI
- Data table display
- Delete dialog display
- Mock data (5 banners)

---

### Issue #2: Hero Settings Has Unnecessary AutoPlay Switch ✓

**Problem**: `autoPlay` field not needed, switches logic is sufficient

**Solution**: Remove `autoPlay` from HeroSettings type and UI

**Files affected**: 5 files
- Type definition
- Service defaults
- Form schema + UI
- Mock data initialization

---

### Issue #3: "All Banners Must Change by Setting Type" ⚠️ CLARIFICATION NEEDED

**Problem**: Statement is ambiguous - what does "setting type" mean?

**Options**:
1. Add new `type` field to Banner (extension)
2. Update `active` status automatically (logic layer)
3. Client-side display filtering (no storage change)

**Current Recommendation**: Option 2 (logic layer) seems most sensible but needs confirmation

**Pending**: Requirements clarification

---

## Change Summary

### Files to Edit

| File | Lines | Changes | Type |
|------|-------|---------|------|
| `src/types/banner.types.ts` | 4, 7-8 | Remove 3 fields | Type def |
| `src/types/heroSettings.types.ts` | 13 | Remove 1 field | Type def |
| `src/components/banners/BannerFormModal.tsx` | Multiple | Remove form fields | Component |
| `src/pages/BannersPage.tsx` | 167-171, 177-184 | Remove table column | Component |
| `src/components/banners/HeroSettingsCard.tsx` | Multiple | Remove UI section | Component |
| `src/components/banners/DeleteBannerDialog.tsx` | 77-80 | Remove description | Component |
| `src/services/heroSettings.service.ts` | 12 | Remove from defaults | Service |
| `src/data/mockBanners.ts` | All 5 banners | Remove fields | Data |
| `src/data/initializeMockData.ts` | 13 | Remove from init | Data |

---

## Field Removal Details

### Banner Type Changes

**From** (14 fields):
```
id, title, description, imageUrl, videoUrl, ctaText, ctaLink,
sortIndex, active, isPrimary, createdAt, updatedAt
```

**To** (11 fields):
```
id, title, imageUrl, videoUrl, sortIndex, active, isPrimary,
createdAt, updatedAt
```

### HeroSettings Type Changes

**From** (5 fields):
```
displayMode, carouselInterval, autoPlay, showControls, updatedAt
```

**To** (4 fields):
```
displayMode, carouselInterval, showControls, updatedAt
```

---

## Breaking Changes

| Category | Impact | Mitigation |
|----------|--------|-----------|
| **Type System** | Banner & HeroSettings signatures change | TypeScript will catch errors |
| **localStorage** | Old data structure incompatible | Hard reset on load (pre-release OK) |
| **UI** | Form fields removed, table simplified | Intentional simplification |

---

## Implementation Steps

```bash
# 1. Update types (start here)
# - Edit src/types/banner.types.ts (remove 3 lines)
# - Edit src/types/heroSettings.types.ts (remove 1 line)
# - Run: npx tsc --noEmit ← verify no errors

# 2. Update form component
# - Edit src/components/banners/BannerFormModal.tsx
# - Remove Zod schema entries
# - Remove form inputs (3 sections)
# - Remove default values

# 3. Update display components
# - Edit src/pages/BannersPage.tsx (remove 1 column)
# - Edit src/components/banners/DeleteBannerDialog.tsx (remove 1 preview)
# - Edit src/components/banners/HeroSettingsCard.tsx (remove 1 section)

# 4. Update service & data
# - Edit src/services/heroSettings.service.ts
# - Edit src/data/mockBanners.ts
# - Edit src/data/initializeMockData.ts

# 5. Test
npm run build
npm run dev
# Test CRUD, hero settings, mock initialization
```

---

## Code Changes - Exact Diffs

### Type: banner.types.ts
```diff
  export type Banner = {
    id: string;
    title: string;
-   description?: string;
    imageUrl: string;
    videoUrl?: string;
-   ctaText?: string;
-   ctaLink?: string;
    sortIndex: number;
    active: boolean;
    isPrimary: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
```

### Type: heroSettings.types.ts
```diff
  export type HeroSettings = {
    displayMode: HeroDisplayMode;
    carouselInterval: number;
-   autoPlay: boolean;
    showControls: boolean;
    updatedAt: Date;
  };
```

### Form: BannerFormModal.tsx Schema
```diff
  const bannerSchema = z.object({
    active: z.boolean(),
-   ctaLink: z.string().url("Must be a valid URL").optional().or(z.literal("")),
-   ctaText: z.string().max(30, "CTA text must be 30 characters or less").optional(),
-   description: z.string().max(500, "Description must be 500 characters or less").optional(),
    imageUrl: z.string().min(1, "Image is required"),
    title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title must be 100 characters or less"),
    videoUrl: z.string().optional(),
  });
```

### Service: heroSettings.service.ts Defaults
```diff
  private readonly DEFAULT_SETTINGS: HeroSettings = {
    displayMode: HERO_DISPLAY_MODES.CAROUSEL,
    carouselInterval: 5000,
-   autoPlay: true,
    showControls: true,
    updatedAt: new Date(),
  };
```

---

## Testing Commands

```bash
# Type checking
npx tsc --noEmit

# Build for production
npm run build

# Development server
npm run dev

# Lint code
npm run lint

# To test localStorage changes:
# 1. Open browser DevTools
# 2. Clear Application → Local Storage
# 3. Reload page
# 4. Verify mock data initializes correctly
```

---

## Questions to Clarify

1. **Issue #3**: What exactly should happen when displayMode changes?
   - Auto-manage banner visibility?
   - Add banner type field?
   - Handle in client app only?

2. **Auto-initialization**: Should app auto-reset old localStorage?
   - Recommended: Yes for pre-release

3. **Timeline**: When should these changes be deployed?
   - Recommend: Before feature-complete status

---

## Related Documents

- **Full Analysis**: `/plans/banner-crud-cleanup/reports/251203-issue-analysis-report.md`
- **Implementation Guide**: `/plans/banner-crud-cleanup/IMPLEMENTATION_GUIDE.md`
- **This Document**: `/plans/banner-crud-cleanup/QUICK_REFERENCE.md`

---

## Status

**Analysis**: ✅ Complete
**Implementation**: ⏳ Pending (ready to start)
**Issue #3 Clarification**: ⚠️ Needed

**Next Step**: Clarify Issue #3, then start implementation from type definitions

---

**Last Updated**: 2025-12-03
**Estimated Work**: 2-3 hours implementation + 1-2 hours testing
