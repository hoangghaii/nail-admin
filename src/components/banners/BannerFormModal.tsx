import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { ImageUpload } from "@/components/shared/ImageUpload";
import { VideoUpload } from "@/components/shared/VideoUpload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { bannersService } from "@/services/banners.service";
import type { Banner, BannerType } from "@/types/banner.types";

const bannerSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be 100 characters or less"),
  type: z.enum(["image", "video"]),
  imageUrl: z.string().min(1, "Image is required"),
  videoUrl: z.string().optional(),
  active: z.boolean(),
});

type BannerFormData = z.infer<typeof bannerSchema>;

export type BannerFormModalProps = {
  banner?: Banner;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  open: boolean;
};

export function BannerFormModal({
  banner,
  onOpenChange,
  onSuccess,
  open,
}: BannerFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!banner;

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
  } = useForm<BannerFormData>({
    defaultValues: {
      title: "",
      type: "image",
      imageUrl: "",
      videoUrl: "",
      active: true,
    },
    resolver: zodResolver(bannerSchema),
  });

  const imageUrl = watch("imageUrl");
  const videoUrl = watch("videoUrl");
  const active = watch("active");
  const type = watch("type");

  useEffect(() => {
    if (banner) {
      reset({
        title: banner.title,
        type: banner.type,
        imageUrl: banner.imageUrl,
        videoUrl: banner.videoUrl || "",
        active: banner.active,
      });
    } else {
      reset({
        title: "",
        type: "image",
        imageUrl: "",
        videoUrl: "",
        active: true,
      });
    }
  }, [banner, reset]);

  const onSubmit = async (data: BannerFormData) => {
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await bannersService.update(banner.id, {
          title: data.title,
          type: data.type,
          imageUrl: data.imageUrl,
          videoUrl: data.videoUrl || undefined,
          active: data.active,
        });
        toast.success("Banner updated successfully!");
      } else {
        const banners = await bannersService.getAll();
        const maxSortIndex = banners.length > 0
          ? Math.max(...banners.map(b => b.sortIndex))
          : -1;

        await bannersService.create({
          title: data.title,
          type: data.type,
          imageUrl: data.imageUrl,
          videoUrl: data.videoUrl || undefined,
          sortIndex: maxSortIndex + 1,
          active: data.active,
          isPrimary: false,
        });
        toast.success("Banner created successfully!");
      }

      onSuccess?.();
      onOpenChange(false);
      reset();
    } catch (error) {
      console.error("Error saving banner:", error);
      toast.error(
        isEditMode
          ? "Failed to update banner. Please try again."
          : "Failed to create banner. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Banner" : "Create New Banner"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the banner information below."
              : "Fill in the details to create a new banner."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Enter banner title..."
                {...register("title")}
              />
              {errors.title && (
                <p className="text-xs text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Banner Type */}
            <div className="space-y-2">
              <Label htmlFor="type">
                Banner Type <span className="text-destructive">*</span>
              </Label>
              <Select
                value={type}
                onValueChange={(value) => setValue("type", value as BannerType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select banner type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image">Image Banner</SelectItem>
                  <SelectItem value="video">Video Banner</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-xs text-destructive">
                  {errors.type.message}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Choose "Image" for static image banners or "Video" for video background banners
              </p>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label>
                Banner Image <span className="text-destructive">*</span>
              </Label>
              <ImageUpload
                folder="banners"
                value={imageUrl}
                onChange={(url) => setValue("imageUrl", url)}
              />
              {errors.imageUrl && (
                <p className="text-xs text-destructive">
                  {errors.imageUrl.message}
                </p>
              )}
            </div>

            {/* Video Upload */}
            <div className="space-y-2">
              <Label>Banner Video (Optional)</Label>
              <VideoUpload
                folder="banners"
                value={videoUrl}
                onChange={(url) => setValue("videoUrl", url)}
              />
              {errors.videoUrl && (
                <p className="text-xs text-destructive">
                  {errors.videoUrl.message}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Add a background video for the banner (optional)
              </p>
            </div>

            {/* Active Toggle */}
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="active">Active Status</Label>
                <p className="text-xs text-muted-foreground">
                  Show this banner on the website
                </p>
              </div>
              <Switch
                id="active"
                checked={active}
                onCheckedChange={(checked) => setValue("active", checked)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                  ? "Update Banner"
                  : "Create Banner"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
