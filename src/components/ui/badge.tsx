import { cn } from "@/lib/utils";
import type { StatutButee, StatutDevis } from "@/lib/types";

export function Badge({
  children,
  variant = "neutral",
  className,
}: {
  children: React.ReactNode;
  variant?: "neutral" | "success" | "warning" | "danger" | "accent";
  className?: string;
}) {
  const styles: Record<string, string> = {
    neutral: "bg-muted text-muted-foreground",
    success: "bg-primary-50 text-primary-800",
    warning: "bg-warning-50 text-warning-900",
    danger: "bg-danger-50 text-danger-900",
    accent: "bg-primary-50 text-primary-800",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function StatutButeeBadge({ statut }: { statut: StatutButee }) {
  if (statut === "OK") return <Badge variant="success">à jour</Badge>;
  if (statut === "BIENTOT_DU") return <Badge variant="warning">bientôt dû</Badge>;
  return <Badge variant="danger">dépassé</Badge>;
}

export function StatutDevisBadge({ statut }: { statut: StatutDevis }) {
  const map: Record<StatutDevis, { label: string; variant: "neutral" | "success" | "warning" | "danger" }> = {
    BROUILLON: { label: "brouillon", variant: "neutral" },
    VALIDE_GARAGE: { label: "validé", variant: "accent" as any },
    ENVOYE_CLIENT: { label: "envoyé au client", variant: "warning" },
    ACCEPTE: { label: "accepté", variant: "success" },
    REFUSE: { label: "refusé", variant: "danger" },
  };
  const m = map[statut];
  return <Badge variant={m.variant}>{m.label}</Badge>;
}
