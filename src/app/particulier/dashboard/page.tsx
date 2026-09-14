import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { ButeeCard } from "@/components/kardex/butee-card";
import { Badge, StatutButeeBadge } from "@/components/ui/badge";
import { formatDate, formatKm } from "@/lib/utils";
import { LIBELLE_INTERVENTION } from "@/lib/types";
import {
  getUtilisateurCourant,
  getVehiculesDuProprietaire,
  getButeesDuVehicule,
  getInterventionsDuVehicule,
  getGarageTitulaireActuel,
  getGarageParId,
} from "@/lib/data/repository";
import { Car, AlertTriangle, CheckCircle2, Building2 } from "lucide-react";

export default function DashboardParticulierPage() {
  const utilisateur = getUtilisateurCourant("PARTICULIER");
  const vehicules = getVehiculesDuProprietaire(utilisateur.id);
  const vehiculePrincipal = vehicules[0];

  const toutesButees = vehicules.flatMap((v) => getButeesDuVehicule(v.id));
  const nbBientotDues = toutesButees.filter((b) => b.statut === "BIENTOT_DU").length;
  const nbDepassees = toutesButees.filter((b) => b.statut === "DEPASSE").length;
  const nbOk = toutesButees.filter((b) => b.statut === "OK").length;

  const buteesVehiculePrincipal = vehiculePrincipal
    ? getButeesDuVehicule(vehiculePrincipal.id)
    : [];
  const interventionsRecentes = vehiculePrincipal
    ? getInterventionsDuVehicule(vehiculePrincipal.id)
    : [];
  const garageTitulaire = vehiculePrincipal
    ? getGarageTitulaireActuel(vehiculePrincipal.id)
    : undefined;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h2 className="text-xl font-medium">Bonjour {utilisateur.nom.split(" ")[0]}</h2>
        <p className="text-sm text-muted-foreground">
          Voici l'état de vos {vehicules.length} véhicule{vehicules.length > 1 ? "s" : ""}.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard label="Véhicules" value={vehicules.length} icon={Car} />
        <KpiCard label="À jour" value={nbOk} icon={CheckCircle2} tone="success" />
        <KpiCard label="Bientôt dues" value={nbBientotDues} icon={AlertTriangle} tone="warning" />
        <KpiCard label="Dépassées" value={nbDepassees} icon={AlertTriangle} tone="danger" />
      </div>

      {vehiculePrincipal && (
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base font-medium text-foreground">
                {vehiculePrincipal.marque} {vehiculePrincipal.modele}
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                {vehiculePrincipal.immatriculation} · {formatKm(vehiculePrincipal.kilometrageCourant)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {garageTitulaire && (
                <Badge variant="accent">
                  <Building2 size={12} className="mr-1 inline" />
                  {garageTitulaire.nom}
                </Badge>
              )}
              <Link
                href={`/particulier/vehicules/${vehiculePrincipal.id}`}
                className="text-sm font-medium text-primary-800 hover:underline"
              >
                Voir le Kardex complet →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {buteesVehiculePrincipal.map((b) => (
                <ButeeCard key={b.id} butee={b} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Dernières interventions</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              {interventionsRecentes.map((i) => {
                const garage = getGarageParId(i.garageId);
                return (
                  <li key={i.id} className="flex items-start gap-3 border-l-2 border-primary-200 pl-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{LIBELLE_INTERVENTION[i.typeIntervention]}</p>
                      <p className="text-xs text-muted-foreground">
                        {garage?.nom} · {formatDate(i.date)} · {formatKm(i.kilometrage)}
                      </p>
                    </div>
                    {i.dossierTravaux && <Badge variant="success">preuve photo</Badge>}
                  </li>
                );
              })}
              {interventionsRecentes.length === 0 && (
                <p className="text-sm text-muted-foreground">Aucune intervention enregistrée.</p>
              )}
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tous mes véhicules</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {vehicules.map((v) => {
                const butees = getButeesDuVehicule(v.id);
                const alerte = butees.find((b) => b.statut !== "OK");
                return (
                  <li key={v.id}>
                    <Link
                      href={`/particulier/vehicules/${v.id}`}
                      className="flex items-center justify-between rounded-md border border-border p-3 hover:bg-muted/40"
                    >
                      <div>
                        <p className="text-sm font-medium">
                          {v.marque} {v.modele}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {v.immatriculation} · {formatKm(v.kilometrageCourant)}
                        </p>
                      </div>
                      {alerte ? (
                        <StatutButeeBadge statut={alerte.statut} />
                      ) : (
                        <Badge variant="success">à jour</Badge>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
