import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function KpiCard({
  label,
  value,
  icon: Icon,
  tone = "neutral",
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  tone?: "neutral" | "success" | "warning" | "danger";
}) {
  const tones: Record<string, string> = {
    neutral: "bg-muted text-foreground",
    success: "bg-primary-50 text-primary-800",
    warning: "bg-warning-50 text-warning-900",
    danger: "bg-danger-50 text-danger-900",
  };
  return (
    <Card>
      <div className="flex items-center gap-4 p-5">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-md", tones[tone])}>
          <Icon size={18} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-2xl font-medium">{value}</p>
        </div>
      </div>
    </Card>
  );
}
