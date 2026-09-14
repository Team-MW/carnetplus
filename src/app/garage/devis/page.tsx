import { Card } from "@/components/ui/card";
import { StatutDevisBadge } from "@/components/ui/badge";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { formatEuro, formatDate } from "@/lib/utils";
import { LIBELLE_INTERVENTION } from "@/lib/types";
import { getGarageCourant, getDevisDuGarage, getVehiculeParId } from "@/lib/data/repository";
import { DevisRowActions } from "./devis-row-actions";

export default function DevisGaragePage() {
  const garage = getGarageCourant();
  const devis = getDevisDuGarage(garage.id);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h2 className="text-xl font-medium">Devis</h2>
        <p className="text-sm text-muted-foreground">
          Générés automatiquement à l'approche d'une butée sur un véhicule où vous êtes titulaire.
          Aucun envoi n'est automatique : chaque devis doit être contrôlé et validé avant transmission.
        </p>
      </div>

      <Card>
        <Table>
          <THead>
            <TR>
              <TH>Véhicule</TH>
              <TH>Motif</TH>
              <TH>Total TTC</TH>
              <TH>Créé le</TH>
              <TH>Statut</TH>
              <TH></TH>
            </TR>
          </THead>
          <TBody>
            {devis.map((d) => {
              const vehicule = getVehiculeParId(d.vehiculeId);
              return (
                <TR key={d.id}>
                  <TD className="font-medium">
                    {vehicule?.marque} {vehicule?.modele}
                    <p className="text-xs font-normal text-muted-foreground">{vehicule?.immatriculation}</p>
                  </TD>
                  <TD>{LIBELLE_INTERVENTION[d.buteeDeclenchanteType]}</TD>
                  <TD>{formatEuro(d.totalTTC)}</TD>
                  <TD className="text-muted-foreground">{formatDate(d.createdAt)}</TD>
                  <TD>
                    <StatutDevisBadge statut={d.statut} />
                  </TD>
                  <TD>
                    <DevisRowActions devis={d} />
                  </TD>
                </TR>
              );
            })}
            {devis.length === 0 && (
              <TR>
                <TD className="text-muted-foreground" colSpan={6 as any}>
                  Aucun devis pour le moment.
                </TD>
              </TR>
            )}
          </TBody>
        </Table>
      </Card>
    </div>
  );
}
