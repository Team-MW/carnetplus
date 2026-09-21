"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Loader2, Car } from "lucide-react";
import type { VehiculeInfoSiv } from "@/lib/services/plaque-siv";

export function RecherchePlaqueSiv() {
  const [immatriculation, setImmatriculation] = useState("");
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [vehicule, setVehicule] = useState<VehiculeInfoSiv | null>(null);

  async function rechercher(e: React.FormEvent) {
    e.preventDefault();
    const value = immatriculation.trim();
    if (!value) return;

    setLoading(true);
    setErreur(null);
    setVehicule(null);

    try {
      const res = await fetch(
        `/api/plaque-siv?immatriculation=${encodeURIComponent(value)}`
      );
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error ?? "Recherche impossible");
      }
      setVehicule(json.data as VehiculeInfoSiv);
    } catch (err) {
      setErreur(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recherche SIV par immatriculation</CardTitle>
        <p className="text-sm text-muted-foreground">
          Identifiez un véhicule via l&apos;API plaque immatriculation SIV (données
          carte grise / fiche technique).
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={rechercher} className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={immatriculation}
            onChange={(e) => setImmatriculation(e.target.value)}
            placeholder="AA-123-BC"
            className="h-10 flex-1 rounded-md border border-border bg-card px-3 text-sm uppercase tracking-wide placeholder:normal-case placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-primary-200"
            maxLength={12}
            autoComplete="off"
            spellCheck={false}
          />
          <Button type="submit" variant="primary" disabled={loading || !immatriculation.trim()}>
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
            Rechercher
          </Button>
        </form>

        {erreur && (
          <p className="rounded-md border border-danger-50 bg-danger-50 px-3 py-2 text-sm text-danger-600">
            {erreur}
          </p>
        )}

        {vehicule && <FicheResultatSiv vehicule={vehicule} />}
      </CardContent>
    </Card>
  );
}

function FicheResultatSiv({ vehicule }: { vehicule: VehiculeInfoSiv }) {
  const champs: { label: string; value: string }[] = [
    { label: "Immatriculation", value: vehicule.immat },
    { label: "VIN", value: vehicule.vin },
    { label: "1re mise en circulation", value: vehicule.date1erCir_fr },
    { label: "Énergie", value: vehicule.energieNGC || vehicule.type_moteur },
    { label: "Puissance", value: [vehicule.puisFiscReelCH, vehicule.puisFisc ? `${vehicule.puisFisc} CV` : ""].filter(Boolean).join(" · ") },
    { label: "Carrosserie", value: vehicule.carrosserie || vehicule.carrosserieCG },
    { label: "Transmission", value: vehicule.type_transmission },
    { label: "Cylindrée", value: vehicule.ccm },
    { label: "Commercial", value: vehicule.sra_commercial },
    { label: "Code moteur", value: vehicule.code_moteur },
  ].filter((c) => c.value);

  return (
    <div className="overflow-hidden rounded-md border border-border">
      <div className="flex flex-col gap-4 bg-muted/40 p-4 sm:flex-row sm:items-start">
        {vehicule.photo_modele ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={vehicule.photo_modele}
            alt={`${vehicule.marque} ${vehicule.modele}`}
            className="h-28 w-full rounded-md object-cover sm:h-24 sm:w-36"
          />
        ) : (
          <div className="flex h-24 w-36 items-center justify-center rounded-md bg-primary-50 text-primary-800">
            <Car size={28} />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            {vehicule.logo_marque && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={vehicule.logo_marque} alt="" className="h-6 w-6 object-contain" />
            )}
            <p className="text-base font-medium">
              {vehicule.marque} {vehicule.modele}
            </p>
            {vehicule.version && <Badge variant="accent">{vehicule.version}</Badge>}
          </div>
          <p className="text-sm text-muted-foreground">
            {vehicule.modele_en || vehicule.sra_commercial}
          </p>
        </div>
      </div>

      <dl className="grid gap-px bg-border sm:grid-cols-2">
        {champs.map((c) => (
          <div key={c.label} className="bg-card px-4 py-3">
            <dt className="text-xs text-muted-foreground">{c.label}</dt>
            <dd className="mt-0.5 text-sm font-medium">{c.value}</dd>
          </div>
        ))}
      </dl>

      {vehicule.pneus?.length > 0 && (
        <div className="border-t border-border px-4 py-3">
          <p className="mb-2 text-xs text-muted-foreground">Pneumatiques</p>
          <div className="flex flex-wrap gap-2">
            {vehicule.pneus.map((p) => (
              <Badge key={p.name} variant="neutral">
                {p.name}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
