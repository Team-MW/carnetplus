import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { LIBELLE_INTERVENTION } from "@/lib/types";
import { FileText, Camera } from "lucide-react";
import {
  getUtilisateurCourant,
  getVehiculesDuProprietaire,
  getInterventionsDuVehicule,
  getGarageParId,
} from "@/lib/data/repository";

export default function DocumentsPage() {
  const utilisateur = getUtilisateurCourant("PARTICULIER");
  const vehicules = getVehiculesDuProprietaire(utilisateur.id);
  const interventions = vehicules.flatMap((v) =>
    getInterventionsDuVehicule(v.id).map((i) => ({ ...i, vehicule: v }))
  );

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h2 className="text-xl font-medium">Documents</h2>
        <p className="text-sm text-muted-foreground">Factures et dossiers travaux de tous vos véhicules.</p>
      </div>

      <div className="space-y-3">
        {interventions.map((i) => (
          <Card key={i.id}>
            <div className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
                  <FileText size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium">{LIBELLE_INTERVENTION[i.typeIntervention]}</p>
                  <p className="text-xs text-muted-foreground">
                    {i.vehicule.marque} {i.vehicule.modele} · {getGarageParId(i.garageId)?.nom} ·{" "}
                    {formatDate(i.date)}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {i.factureSourceUrl && <Badge variant="neutral">facture</Badge>}
                {i.dossierTravaux && (
                  <Badge variant="success">
                    <Camera size={11} className="mr-1 inline" /> dossier travaux
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
        {interventions.length === 0 && (
          <p className="text-sm text-muted-foreground">Aucun document pour le moment.</p>
        )}
      </div>
    </div>
  );
}
