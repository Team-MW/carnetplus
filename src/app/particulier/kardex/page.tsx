import Link from "next/link";
import { Card } from "@/components/ui/card";
import { StatutButeeBadge } from "@/components/ui/badge";
import { formatDate, formatKm } from "@/lib/utils";
import { LIBELLE_INTERVENTION } from "@/lib/types";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { getUtilisateurCourant, getVehiculesDuProprietaire, getButeesDuVehicule } from "@/lib/data/repository";

export default function KardexGlobalPage() {
  const utilisateur = getUtilisateurCourant("PARTICULIER");
  const vehicules = getVehiculesDuProprietaire(utilisateur.id);

  const lignes = vehicules.flatMap((v) =>
    getButeesDuVehicule(v.id).map((b) => ({ vehicule: v, butee: b }))
  );
  const ordre = { DEPASSE: 0, BIENTOT_DU: 1, OK: 2 };
  lignes.sort((a, b) => ordre[a.butee.statut] - ordre[b.butee.statut]);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h2 className="text-xl font-medium">Kardex — vue d'ensemble</h2>
        <p className="text-sm text-muted-foreground">
          Toutes les butées d'entretien de tous vos véhicules, triées par urgence.
        </p>
      </div>

      <Card>
        <Table>
          <THead>
            <TR>
              <TH>Véhicule</TH>
              <TH>Intervention</TH>
              <TH>Dernière</TH>
              <TH>Butée calendaire</TH>
              <TH>Butée km</TH>
              <TH>Statut</TH>
            </TR>
          </THead>
          <TBody>
            {lignes.map(({ vehicule, butee }) => (
              <TR key={butee.id}>
                <TD>
                  <Link href={`/particulier/vehicules/${vehicule.id}`} className="font-medium hover:underline">
                    {vehicule.marque} {vehicule.modele}
                  </Link>
                  <p className="text-xs text-muted-foreground">{vehicule.immatriculation}</p>
                </TD>
                <TD>{LIBELLE_INTERVENTION[butee.typeIntervention]}</TD>
                <TD className="text-muted-foreground">
                  {formatDate(butee.dateDerniereIntervention)} · {formatKm(butee.kmDerniereIntervention)}
                </TD>
                <TD className="text-muted-foreground">{formatDate(butee.buteeDate)}</TD>
                <TD className="text-muted-foreground">{formatKm(butee.buteeKm)}</TD>
                <TD>
                  <StatutButeeBadge statut={butee.statut} />
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </Card>
    </div>
  );
}
