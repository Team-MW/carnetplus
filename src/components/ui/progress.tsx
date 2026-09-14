import { cn } from "@/lib/utils";

export function Progress({
  value,
  variant = "success",
  className,
}: {
  value: number; // 0-100
  variant?: "success" | "warning" | "danger";
  className?: string;
}) {
  const fillColor: Record<string, string> = {
    success: "bg-primary-400",
    warning: "bg-warning-400",
    danger: "bg-danger-400",
  };
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-muted", className)}>
      <div
        className={cn("h-full rounded-full transition-all", fillColor[variant])}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
