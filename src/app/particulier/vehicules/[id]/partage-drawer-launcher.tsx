"use client";

import { useState } from "react";
import { Drawer } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { formatDate } from "@/lib/utils";
import type { AutorisationAcces } from "@/lib/types";
import { Share2, QrCode, CheckCircle2, Circle } from "lucide-react";

export function PartageAccesDrawerLauncher({
  vehiculeId,
  autorisations,
}: {
  vehiculeId: string;
  autorisations: AutorisationAcces[];
}) {
  const [open, setOpen] = useState(false);
  const [typeChoisi, setTypeChoisi] = useState<"PERMANENTE" | "PONCTUELLE">("PERMANENTE");
  const [aRevoquer, setARevoquer] = useState<AutorisationAcces | null>(null);
  const [listeAutorisations, setListeAutorisations] = useState(autorisations);

  function confirmerRevocation() {
    if (!aRevoquer) return;
    // RÈGLE 6.5 — la révocation coupe immédiatement tout accès du garage.
    setListeAutorisations((prev) =>
      prev.map((a) =>
        a.id === aRevoquer.id ? { ...a, dateRevocation: new Date().toISOString() } : a
      )
    );
    setARevoquer(null);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-md bg-primary-600 px-3 py-2 text-sm font-medium text-white hover:bg-primary-800"
      >
        <Share2 size={15} /> Partager l'accès
      </button>

      <Drawer open={open} onClose={() => setOpen(false)} title="Partager l'accès">
        <p className="mb-4 text-sm text-muted-foreground">
          Autorisez un garage à consulter et compléter le Kardex de ce véhicule.
        </p>

        <div className="mb-6 flex flex-col items-center gap-3 rounded-lg bg-primary-50 p-6">
          <div className="flex h-32 w-32 items-center justify-center rounded-md bg-white">
            <QrCode size={80} className="text-primary-900" />
          </div>
          <p className="text-xs text-primary-800">Code véhicule : {vehiculeId.toUpperCase()}</p>
        </div>

        <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">Type d'autorisation</p>
        <div className="mb-6 space-y-2">
          <button
            onClick={() => setTypeChoisi("PERMANENTE")}
            className="flex w-full items-center gap-3 rounded-md border border-border p-3 text-left hover:bg-muted/40"
            style={typeChoisi === "PERMANENTE" ? { borderColor: "#0F6E56", background: "#E1F5EE" } : undefined}
          >
            {typeChoisi === "PERMANENTE" ? (
              <CheckCircle2 size={18} className="text-primary-600" />
            ) : (
              <Circle size={18} className="text-muted-foreground" />
            )}
            <div>
              <p className="text-sm font-medium">Garage habituel</p>
              <p className="text-xs text-muted-foreground">Accès permanent, devient titulaire</p>
            </div>
          </button>
          <button
            onClick={() => setTypeChoisi("PONCTUELLE")}
            className="flex w-full items-center gap-3 rounded-md border border-border p-3 text-left hover:bg-muted/40"
            style={typeChoisi === "PONCTUELLE" ? { borderColor: "#0F6E56", background: "#E1F5EE" } : undefined}
          >
            {typeChoisi === "PONCTUELLE" ? (
              <CheckCircle2 size={18} className="text-primary-600" />
            ) : (
              <Circle size={18} className="text-muted-foreground" />
            )}
            <div>
              <p className="text-sm font-medium">Garage de passage</p>
              <p className="text-xs text-muted-foreground">Accès limité à cette seule intervention</p>
            </div>
          </button>
        </div>

        <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">Accès déjà autorisés</p>
        <div className="mb-6 space-y-2">
          {listeAutorisations.map((a) => (
            <div key={a.id} className="flex items-center justify-between border-b border-border py-2">
              <div>
                <p className="text-sm">
                  {a.garageId} <span className="text-xs text-muted-foreground">· {a.type === "PERMANENTE" ? "titulaire" : "ponctuel"}</span>
                </p>
                <p className="text-xs text-muted-foreground">Depuis le {formatDate(a.dateOctroi)}</p>
              </div>
              {a.dateRevocation ? (
                <span className="text-xs text-danger-600">révoqué</span>
              ) : (
                <button
                  onClick={() => setARevoquer(a)}
                  className="text-xs font-medium text-danger-600 hover:underline"
                >
                  Révoquer
                </button>
              )}
            </div>
          ))}
        </div>

        <Button variant="primary" className="w-full" onClick={() => setOpen(false)}>
          Valider le partage
        </Button>
      </Drawer>

      <Dialog open={!!aRevoquer} onClose={() => setARevoquer(null)} title="Révoquer l'accès ?">
        <p className="mb-4 text-sm text-muted-foreground">
          Ce garage perdra immédiatement tout accès en lecture et écriture sur ce véhicule.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setARevoquer(null)}>
            Annuler
          </Button>
          <Button variant="danger" onClick={confirmerRevocation}>
            Révoquer
          </Button>
        </div>
      </Dialog>
    </>
  );
}
