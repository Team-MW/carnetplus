import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatutButeeBadge } from "@/components/ui/badge";
import { formatDate, formatKm } from "@/lib/utils";
import { LIBELLE_INTERVENTION } from "@/lib/types";
import type { ButeeCalculee } from "@/lib/types";

function progressionVariant(statut: ButeeCalculee["statut"]) {
  if (statut === "OK") return "success" as const;
  if (statut === "BIENTOT_DU") return "warning" as const;
  return "danger" as const;
}

export function ButeeCard({ butee, onClick }: { butee: ButeeCalculee; onClick?: () => void }) {
  const variant = progressionVariant(butee.statut);
  const progressionMois = Math.min(
    100,
    Math.max(0, 100 - (butee.moisRestants / butee.intervalleMoisDefaut) * 100)
  );

  return (
    <Card
      className={onClick ? "cursor-pointer transition-shadow hover:shadow-md" : undefined}
    >
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-2" onClick={onClick}>
          <div>
            <p className="text-sm font-medium">{LIBELLE_INTERVENTION[butee.typeIntervention]}</p>
            <p className="text-xs text-muted-foreground">
              Dernière intervention : {formatDate(butee.dateDerniereIntervention)} ·{" "}
              {formatKm(butee.kmDerniereIntervention)}
            </p>
          </div>
          <StatutButeeBadge statut={butee.statut} />
        </div>
        <Progress value={progressionMois} variant={variant} className="mb-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>
            Butée : {formatDate(butee.buteeDate)} · {formatKm(butee.buteeKm)}
          </span>
          <span>
            {butee.moisRestants > 0 ? `reste ${butee.moisRestants} mois` : "échéance dépassée"}
          </span>
        </div>
      </div>
    </Card>
  );
}
