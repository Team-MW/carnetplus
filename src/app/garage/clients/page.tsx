import { Card } from "@/components/ui/card";
import { formatKm } from "@/lib/utils";
import { getGarageCourant, getClientsDuGarage } from "@/lib/data/repository";
import { User } from "lucide-react";

export default function ClientsGaragePage() {
  const garage = getGarageCourant();
  const clients = getClientsDuGarage(garage.id);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h2 className="text-xl font-medium">Clients</h2>
        <p className="text-sm text-muted-foreground">
          Propriétaires vous ayant accordé un accès à au moins un véhicule.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {clients.map(({ utilisateur, vehicules }) => (
          <Card key={utilisateur.id}>
            <div className="p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50 text-primary-800">
                  <User size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium">{utilisateur.nom}</p>
                  <p className="text-xs text-muted-foreground">{utilisateur.email}</p>
                </div>
              </div>
              <ul className="space-y-1">
                {vehicules.map((v) => (
                  <li key={v.id} className="text-xs text-muted-foreground">
                    {v.marque} {v.modele} — {v.immatriculation} · {formatKm(v.kilometrageCourant)}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
        {clients.length === 0 && <p className="text-sm text-muted-foreground">Aucun client pour le moment.</p>}
      </div>
    </div>
  );
}
