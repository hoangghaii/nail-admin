import { cva, type VariantProps } from "class-variance-authority";
import { Check, Star, X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const statusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors",
  {
    defaultVariants: {
      status: "active",
      variant: "default",
    },
    variants: {
      status: {
        active: "",
        inactive: "",
        primary: "",
      },
      variant: {
        default: "",
        outline: "border",
      },
    },
  },
);

export type StatusBadgeProps = {
  className?: string;
  isPrimary?: boolean;
  status?: "active" | "inactive";
  variant?: "default" | "outline";
} & React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof statusBadgeVariants>;

const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  (
    { className, isPrimary = false, status = "active", variant = "default", ...props },
    ref,
  ) => {
    const getStatusStyles = () => {
      if (isPrimary) {
        return variant === "outline"
          ? "border-primary text-primary bg-primary/10"
          : "bg-primary text-primary-foreground";
      }

      if (status === "active") {
        return variant === "outline"
          ? "border-green-500 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/20"
          : "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400";
      }

      return variant === "outline"
        ? "border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20"
        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400";
    };

    const getIcon = () => {
      if (isPrimary) {
        return <Star className="h-3 w-3" />;
      }
      if (status === "active") {
        return <Check className="h-3 w-3" />;
      }
      return <X className="h-3 w-3" />;
    };

    const getLabel = () => {
      if (isPrimary) return "Primary";
      return status === "active" ? "Active" : "Inactive";
    };

    return (
      <span
        ref={ref}
        className={cn(
          statusBadgeVariants({ status, variant }),
          getStatusStyles(),
          className,
        )}
        {...props}
      >
        {getIcon()}
        {getLabel()}
      </span>
    );
  },
);
StatusBadge.displayName = "StatusBadge";

export { StatusBadge };
