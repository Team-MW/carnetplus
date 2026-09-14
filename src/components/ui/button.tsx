import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "secondary", size = "md", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none";
    const variants: Record<string, string> = {
      primary: "bg-primary-600 text-white hover:bg-primary-800",
      secondary: "border border-border bg-card hover:bg-muted",
      ghost: "hover:bg-muted",
      danger: "bg-danger-400 text-white hover:bg-danger-600",
    };
    const sizes: Record<string, string> = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
    };
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
