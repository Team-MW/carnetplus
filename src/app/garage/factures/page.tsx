import { Card } from "@/components/ui/card";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { formatDate, formatEuro } from "@/lib/utils";
import { LIBELLE_INTERVENTION } from "@/lib/types";
import { getGarageCourant, getInterventionsDuGarage, getVehiculeParId } from "@/lib/data/repository";
import { FileText } from "lucide-react";

export default function FacturesGaragePage() {
  const garage = getGarageCourant();
  const interventions = getInterventionsDuGarage(garage.id).filter((i) => i.factureSourceUrl || i.lignesFacture.length > 0);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h2 className="text-xl font-medium">Factures</h2>
        <p className="text-sm text-muted-foreground">
          Factures déposées et déjà ventilées automatiquement dans le Kardex des véhicules concernés.
        </p>
      </div>

      <Card>
        <Table>
          <THead>
            <TR>
              <TH>Véhicule</TH>
              <TH>Intervention</TH>
              <TH>Date</TH>
              <TH>Montant HT</TH>
              <TH></TH>
            </TR>
          </THead>
          <TBody>
            {interventions.map((i) => {
              const vehicule = getVehiculeParId(i.vehiculeId);
              const montant = i.lignesFacture.reduce((s, l) => s + l.montantHT, 0);
              return (
                <TR key={i.id}>
                  <TD className="font-medium">
                    {vehicule?.marque} {vehicule?.modele}
                    <p className="text-xs font-normal text-muted-foreground">{vehicule?.immatriculation}</p>
                  </TD>
                  <TD>{LIBELLE_INTERVENTION[i.typeIntervention]}</TD>
                  <TD className="text-muted-foreground">{formatDate(i.date)}</TD>
                  <TD>{formatEuro(montant)}</TD>
                  <TD>
                    <button className="flex items-center gap-1 text-sm text-primary-800 hover:underline">
                      <FileText size={14} /> Voir
                    </button>
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
