import Link from "next/link";
import { Card } from "@/components/ui/card";
import { StatutButeeBadge, Badge } from "@/components/ui/badge";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { formatKm } from "@/lib/utils";
import { getGarageCourant, getVehiculesAccessiblesParGarage, getButeesDuVehicule, getGarageTitulaireActuel } from "@/lib/data/repository";

export default function VehiculesGaragePage() {
  const garage = getGarageCourant();
  const vehicules = getVehiculesAccessiblesParGarage(garage.id);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h2 className="text-xl font-medium">Véhicules</h2>
        <p className="text-sm text-muted-foreground">
          Véhicules pour lesquels vous avez une autorisation d'accès active.
        </p>
      </div>

      <Card>
        <Table>
          <THead>
            <TR>
              <TH>Véhicule</TH>
              <TH>Immatriculation</TH>
              <TH>Kilométrage</TH>
              <TH>Titulaire</TH>
              <TH>Statut Kardex</TH>
            </TR>
          </THead>
          <TBody>
            {vehicules.map((v) => {
              const butees = getButeesDuVehicule(v.id);
              const pire = butees.find((b) => b.statut === "DEPASSE") ?? butees.find((b) => b.statut === "BIENTOT_DU");
              const titulaire = getGarageTitulaireActuel(v.id);
              return (
                <TR key={v.id}>
                  <TD>
                    <Link href={`/garage/vehicules/${v.id}`} className="font-medium hover:underline">
                      {v.marque} {v.modele}
                    </Link>
                  </TD>
                  <TD className="text-muted-foreground">{v.immatriculation}</TD>
                  <TD className="text-muted-foreground">{formatKm(v.kilometrageCourant)}</TD>
                  <TD>
                    {titulaire?.id === garage.id ? (
                      <Badge variant="accent">vous êtes titulaire</Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">{titulaire?.nom ?? "—"}</span>
                    )}
                  </TD>
                  <TD>{pire ? <StatutButeeBadge statut={pire.statut} /> : <Badge variant="success">à jour</Badge>}</TD>
                </TR>
              );
            })}
          </TBody>
        </Table>
      </Card>
    </div>
  );
}
