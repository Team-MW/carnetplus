import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getUtilisateurCourant, getVehiculesDuProprietaire } from "@/lib/data/repository";

export default function ProfilPage() {
  const utilisateur = getUtilisateurCourant("PARTICULIER");
  const vehicules = getVehiculesDuProprietaire(utilisateur.id);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h2 className="text-xl font-medium">Profil</h2>

      <Card>
        <CardHeader>
          <CardTitle>Informations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground">Nom</p>
            <p className="text-sm">{utilisateur.nom}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Email</p>
            <p className="text-sm">{utilisateur.email}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Véhicules enregistrés</p>
            <p className="text-sm">{vehicules.length}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Export et conformité</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Conformément au principe fondateur de Carnet+, votre historique vous appartient et
            reste exportable à tout moment.
          </p>
          <Button variant="secondary">Exporter toutes mes données</Button>
        </CardContent>
      </Card>
    </div>
  );
}
