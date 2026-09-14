import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import {
  getUtilisateurCourant,
  getVehiculesDuProprietaire,
  getAutorisationsDuVehicule,
  getGarageParId,
} from "@/lib/data/repository";

export default function AutorisationsPage() {
  const utilisateur = getUtilisateurCourant("PARTICULIER");
  const vehicules = getVehiculesDuProprietaire(utilisateur.id);
  const lignes = vehicules.flatMap((v) =>
    getAutorisationsDuVehicule(v.id).map((a) => ({ ...a, vehicule: v }))
  );

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h2 className="text-xl font-medium">Autorisations d'accès</h2>
        <p className="text-sm text-muted-foreground">
          Vue d'ensemble des garages autorisés, véhicule par véhicule. Révocable à tout moment
          depuis la fiche de chaque véhicule.
        </p>
      </div>

      <Card>
        <div className="divide-y divide-border">
          {lignes.map((a) => {
            const garage = getGarageParId(a.garageId);
            return (
              <div key={a.id} className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm font-medium">
                    {garage?.nom} <span className="text-xs text-muted-foreground">→ {a.vehicule.marque} {a.vehicule.modele}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {a.type === "PERMANENTE" ? "Garage habituel" : "Garage de passage"} · depuis le{" "}
                    {formatDate(a.dateOctroi)}
                  </p>
                </div>
                <span className={`text-xs font-medium ${a.dateRevocation ? "text-danger-600" : "text-primary-600"}`}>
                  {a.dateRevocation ? "révoqué" : "actif"}
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
