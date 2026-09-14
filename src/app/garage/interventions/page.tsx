import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { formatDate, formatKm } from "@/lib/utils";
import { LIBELLE_INTERVENTION } from "@/lib/types";
import { getGarageCourant, getInterventionsDuGarage, getVehiculeParId } from "@/lib/data/repository";
import { DeposerFactureButton } from "./deposer-facture-button";

export default function InterventionsGaragePage() {
  const garage = getGarageCourant();
  const interventions = getInterventionsDuGarage(garage.id);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-medium">Interventions</h2>
          <p className="text-sm text-muted-foreground">
            Zéro double saisie : déposez la facture déjà émise, la ventilation se fait automatiquement.
          </p>
        </div>
        <DeposerFactureButton />
      </div>

      <Card>
        <Table>
          <THead>
            <TR>
              <TH>Véhicule</TH>
              <TH>Intervention</TH>
              <TH>Date</TH>
              <TH>Kilométrage</TH>
              <TH>Dossier travaux</TH>
            </TR>
          </THead>
          <TBody>
            {interventions.map((i) => {
              const vehicule = getVehiculeParId(i.vehiculeId);
              return (
                <TR key={i.id}>
                  <TD className="font-medium">
                    {vehicule?.marque} {vehicule?.modele}
                    <p className="text-xs font-normal text-muted-foreground">{vehicule?.immatriculation}</p>
                  </TD>
                  <TD>{LIBELLE_INTERVENTION[i.typeIntervention]}</TD>
                  <TD className="text-muted-foreground">{formatDate(i.date)}</TD>
                  <TD className="text-muted-foreground">{formatKm(i.kilometrage)}</TD>
                  <TD>
                    {i.dossierTravaux ? (
                      <Badge variant="success">complet</Badge>
                    ) : (
                      <Badge variant="warning">à compléter</Badge>
                    )}
                  </TD>
                </TR>
              );
            })}
          </TBody>
        </Table>
      </Card>
    </div>
  );
}
