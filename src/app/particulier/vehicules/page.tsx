import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge, StatutButeeBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatKm } from "@/lib/utils";
import { getUtilisateurCourant, getVehiculesDuProprietaire, getButeesDuVehicule } from "@/lib/data/repository";
import { Car, Bike, Plus } from "lucide-react";

export default function VehiculesPage() {
  const utilisateur = getUtilisateurCourant("PARTICULIER");
  const vehicules = getVehiculesDuProprietaire(utilisateur.id);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">Mes véhicules</h2>
        <Button variant="primary">
          <Plus size={16} /> Ajouter un véhicule
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {vehicules.map((v) => {
          const butees = getButeesDuVehicule(v.id);
          const nbAlertes = butees.filter((b) => b.statut !== "OK").length;
          const Icon = v.typeVehicule === "moto" ? Bike : Car;
          return (
            <Link key={v.id} href={`/particulier/vehicules/${v.id}`}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <div className="p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-50 text-primary-800">
                      <Icon size={18} />
                    </div>
                    {nbAlertes > 0 ? (
                      <StatutButeeBadge statut="BIENTOT_DU" />
                    ) : (
                      <Badge variant="success">à jour</Badge>
                    )}
                  </div>
                  <p className="font-medium">
                    {v.marque} {v.modele}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {v.immatriculation} · {formatKm(v.kilometrageCourant)}
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {butees.length} butée{butees.length > 1 ? "s" : ""} suivie{butees.length > 1 ? "s" : ""}
                    {nbAlertes > 0 ? ` · ${nbAlertes} à surveiller` : ""}
                  </p>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
