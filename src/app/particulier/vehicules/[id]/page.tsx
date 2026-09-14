import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ButeeCard } from "@/components/kardex/butee-card";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatKm } from "@/lib/utils";
import { LIBELLE_INTERVENTION } from "@/lib/types";
import {
  getVehiculeParId,
  getButeesDuVehicule,
  getInterventionsDuVehicule,
  getGarageTitulaireActuel,
  getGarageParId,
  getAutorisationsDuVehicule,
} from "@/lib/data/repository";
import { ShieldCheck, ClipboardCheck, Building2, Share2, Download, Camera } from "lucide-react";
import { PartageAccesDrawerLauncher } from "./partage-drawer-launcher";

export default function FicheVehiculePage({ params }: { params: { id: string } }) {
  const vehicule = getVehiculeParId(params.id);
  if (!vehicule) notFound();

  const butees = getButeesDuVehicule(vehicule.id);
  const interventions = getInterventionsDuVehicule(vehicule.id);
  const garageTitulaire = getGarageTitulaireActuel(vehicule.id);
  const autorisations = getAutorisationsDuVehicule(vehicule.id);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Card className="bg-primary-50">
        <div className="flex flex-col justify-between gap-4 p-6 md:flex-row md:items-center">
          <div>
            <p className="text-lg font-medium text-primary-900">
              {vehicule.marque} {vehicule.modele}
            </p>
            <p className="text-sm text-primary-800">
              {vehicule.immatriculation} · {formatKm(vehicule.kilometrageCourant)} · VIN {vehicule.vin}
            </p>
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-primary-800">
              <span className="flex items-center gap-1">
                <ShieldCheck size={13} />
                {vehicule.statutAssuranceFva === "assure" ? "Assuré (FVA)" : "Assurance à vérifier"}
              </span>
              {vehicule.dateProchainCT && (
                <span className="flex items-center gap-1">
                  <ClipboardCheck size={13} />
                  CT valide jusqu'au {formatDate(vehicule.dateProchainCT)}
                </span>
              )}
              {garageTitulaire && (
                <span className="flex items-center gap-1">
                  <Building2 size={13} />
                  Garage titulaire : {garageTitulaire.nom}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-primary-800 hover:bg-primary-100">
              <Download size={15} /> Exporter
            </button>
            <PartageAccesDrawerLauncher vehiculeId={vehicule.id} autorisations={autorisations} />
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Kardex — pièces et fluides suivis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {butees.map((b) => (
              <ButeeCard key={b.id} butee={b} />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historique des interventions</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-4">
            {interventions.map((i) => {
              const garage = getGarageParId(i.garageId);
              return (
                <li key={i.id} className="rounded-md border border-border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium">{LIBELLE_INTERVENTION[i.typeIntervention]}</p>
                      <p className="text-xs text-muted-foreground">
                        {garage?.nom} · {formatDate(i.date)} · {formatKm(i.kilometrage)}
                      </p>
                    </div>
                    {i.dossierTravaux && (
                      <Badge variant="success">
                        <Camera size={11} className="mr-1 inline" /> Dossier travaux disponible
                      </Badge>
                    )}
                  </div>
                  {i.dossierTravaux && (
                    <div className="mt-3 rounded-md bg-muted/50 p-3 text-xs text-muted-foreground">
                      {i.dossierTravaux.commentaireIa}
                    </div>
                  )}
                </li>
              );
            })}
            {interventions.length === 0 && (
              <p className="text-sm text-muted-foreground">Aucune intervention enregistrée pour ce véhicule.</p>
            )}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
