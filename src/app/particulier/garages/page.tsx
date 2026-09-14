import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, ShieldCheck } from "lucide-react";
import {
  getUtilisateurCourant,
  getVehiculesDuProprietaire,
  getAutorisationsDuVehicule,
  getGarageParId,
} from "@/lib/data/repository";

export default function GaragesPage() {
  const utilisateur = getUtilisateurCourant("PARTICULIER");
  const vehicules = getVehiculesDuProprietaire(utilisateur.id);

  const garageIds = new Set(
    vehicules.flatMap((v) => getAutorisationsDuVehicule(v.id).filter((a) => !a.dateRevocation).map((a) => a.garageId))
  );

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h2 className="text-xl font-medium">Mes garages</h2>
        <p className="text-sm text-muted-foreground">
          Garages ayant actuellement accès à un ou plusieurs de vos véhicules.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from(garageIds).map((garageId) => {
          const garage = getGarageParId(garageId);
          if (!garage) return null;
          const vehiculesConcernes = vehicules.filter((v) =>
            getAutorisationsDuVehicule(v.id).some((a) => a.garageId === garageId && !a.dateRevocation)
          );
          return (
            <Card key={garage.id}>
              <div className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-50 text-primary-800">
                    <Building2 size={18} />
                  </div>
                  {garage.badgeVerifie && (
                    <Badge variant="success">
                      <ShieldCheck size={11} className="mr-1 inline" /> garage vérifié
                    </Badge>
                  )}
                </div>
                <p className="font-medium">{garage.nom}</p>
                <p className="text-xs text-muted-foreground">
                  Accès à {vehiculesConcernes.length} véhicule{vehiculesConcernes.length > 1 ? "s" : ""} :{" "}
                  {vehiculesConcernes.map((v) => v.modele).join(", ")}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
