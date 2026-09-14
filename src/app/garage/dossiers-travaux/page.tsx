import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { LIBELLE_INTERVENTION } from "@/lib/types";
import { getGarageCourant, getInterventionsDuGarage, getVehiculeParId } from "@/lib/data/repository";
import { Tag, Package, Wrench, Trash2 } from "lucide-react";

export default function DossiersTravauxPage() {
  const garage = getGarageCourant();
  const interventions = getInterventionsDuGarage(garage.id).filter((i) => i.dossierTravaux);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h2 className="text-xl font-medium">Dossiers travaux</h2>
        <p className="text-sm text-muted-foreground">
          Preuve anti-fraude en 4 photos par intervention : étiquette, pièce neuve, pièce installée,
          pièce usagée. Capture native, horodatage serveur, géolocalisation et hash SHA-256 par photo.
        </p>
      </div>

      <div className="space-y-4">
        {interventions.map((i) => {
          const vehicule = getVehiculeParId(i.vehiculeId);
          const d = i.dossierTravaux!;
          const vignettes = [
            { label: "Étiquette pièce neuve", icon: Tag, hash: d.hashEtiquette },
            { label: "Pièce neuve déballée", icon: Package, hash: d.hashPieceNeuve },
            { label: "Pièce installée", icon: Wrench, hash: d.hashPieceInstallee },
            { label: "Pièce usagée déposée", icon: Trash2, hash: d.hashPieceUsagee },
          ];
          return (
            <Card key={i.id}>
              <div className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{LIBELLE_INTERVENTION[i.typeIntervention]}</p>
                    <p className="text-xs text-muted-foreground">
                      {vehicule?.marque} {vehicule?.modele} · {formatDate(i.date)}
                    </p>
                  </div>
                </div>
                <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {vignettes.map((v) => (
                    <div key={v.label} className="rounded-md border border-border p-3">
                      <div className="mb-2 flex h-16 items-center justify-center rounded-md bg-muted">
                        <v.icon size={22} className="text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground">{v.label}</p>
                      <p className="truncate text-[10px] text-muted-foreground">hash {v.hash}</p>
                    </div>
                  ))}
                </div>
                {d.commentaireIa && (
                  <div className="rounded-md bg-muted/50 p-3 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Commentaire IA · </span>
                    {d.commentaireIa}
                  </div>
                )}
                <div className="mt-3 flex gap-4 text-[11px] text-muted-foreground">
                  <span>Horodatage serveur : {formatDate(d.horodatageServeur)}</span>
                  {d.geoLat && d.geoLng && <span>Géolocalisé</span>}
                </div>
              </div>
            </Card>
          );
        })}
        {interventions.length === 0 && (
          <p className="text-sm text-muted-foreground">Aucun dossier travaux pour le moment.</p>
        )}
      </div>
    </div>
  );
}
