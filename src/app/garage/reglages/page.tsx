import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGarageCourant } from "@/lib/data/repository";
import { TauxHoraireForm } from "./taux-horaire-form";

export default function ReglagesGaragePage() {
  const garage = getGarageCourant();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h2 className="text-xl font-medium">Réglages</h2>

      <Card>
        <CardHeader>
          <CardTitle>Informations du garage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground">Nom</p>
            <p className="text-sm">{garage.nom}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">SIRET</p>
            <p className="text-sm">{garage.siret}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Statut</p>
            <p className="text-sm">{garage.badgeVerifie ? "Garage vérifié" : "Vérification en cours"}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Barème de facturation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            Ce taux horaire est utilisé pour pré-remplir automatiquement la ligne main d'œuvre de
            chaque devis généré (barème de temps constructeur × ce taux).
          </p>
          <TauxHoraireForm tauxInitial={garage.tauxHoraireHT} />
        </CardContent>
      </Card>
    </div>
  );
}
