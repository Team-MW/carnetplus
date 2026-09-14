import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatKm } from "@/lib/utils";
import { LIBELLE_INTERVENTION } from "@/lib/types";
import {
  getGarageCourant,
  getVehiculesAccessiblesParGarage,
  getButeesBientotDuesPourGarageTitulaire,
  getInterventionsDuGarage,
  getDevisDuGarage,
} from "@/lib/data/repository";
import { Car, ClipboardList, Wrench, ShieldCheck } from "lucide-react";

export default function DashboardGaragePage() {
  const garage = getGarageCourant();
  const vehicules = getVehiculesAccessiblesParGarage(garage.id);
  const alertesDevis = getButeesBientotDuesPourGarageTitulaire(garage.id);
  const interventionsRecentes = getInterventionsDuGarage(garage.id).slice(0, 5);
  const devisEnAttente = getDevisDuGarage(garage.id).filter((d) => d.statut === "BROUILLON");

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-medium">{garage.nom}</h2>
          <p className="text-sm text-muted-foreground">Espace professionnel</p>
        </div>
        {garage.badgeVerifie && (
          <Badge variant="success">
            <ShieldCheck size={12} className="mr-1 inline" /> Garage vérifié
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard label="Véhicules suivis" value={vehicules.length} icon={Car} />
        <KpiCard label="Devis à traiter" value={devisEnAttente.length} icon={ClipboardList} tone="warning" />
        <KpiCard label="Interventions (total)" value={getInterventionsDuGarage(garage.id).length} icon={Wrench} />
        <KpiCard label="Taux horaire HT" value={`${garage.tauxHoraireHT} €`} icon={ShieldCheck} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Devis à envoyer (garage titulaire)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {alertesDevis.map((a) => (
            <div key={a.id} className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-border p-4">
              <div>
                <p className="text-sm font-medium">
                  {a.vehicule.marque} {a.vehicule.modele} · {a.vehicule.immatriculation}
                </p>
                <p className="text-xs text-muted-foreground">
                  {LIBELLE_INTERVENTION[a.typeIntervention]} — butée {a.statut === "DEPASSE" ? "dépassée" : "bientôt due"} (
                  {formatDate(a.buteeDate)} · {formatKm(a.buteeKm)})
                </p>
              </div>
              <Link
                href={`/garage/devis?vehiculeId=${a.vehicule.id}&type=${a.typeIntervention}`}
                className="rounded-md bg-primary-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-primary-800"
              >
                Préparer le devis
              </Link>
            </div>
          ))}
          {alertesDevis.length === 0 && (
            <p className="text-sm text-muted-foreground">Aucune échéance à venir sur vos véhicules titulaires.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dernières interventions enregistrées</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {interventionsRecentes.map((i) => (
            <div key={i.id} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
              <div>
                <p className="text-sm font-medium">{LIBELLE_INTERVENTION[i.typeIntervention]}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(i.date)} · {formatKm(i.kilometrage)}
                </p>
              </div>
              {i.dossierTravaux && <Badge variant="success">preuve photo</Badge>}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
