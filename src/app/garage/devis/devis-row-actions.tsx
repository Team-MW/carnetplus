"use client";

import { useState } from "react";
import { Drawer } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { StatutDevisBadge } from "@/components/ui/badge";
import { formatEuro } from "@/lib/utils";
import { LIBELLE_INTERVENTION } from "@/lib/types";
import type { Devis, StatutDevis } from "@/lib/types";

export function DevisRowActions({ devis }: { devis: Devis }) {
  const [open, setOpen] = useState(false);
  const [statut, setStatut] = useState<StatutDevis>(devis.statut);
  const [confirmEnvoi, setConfirmEnvoi] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="text-sm font-medium text-primary-800 hover:underline">
        Ouvrir
      </button>

      <Drawer open={open} onClose={() => setOpen(false)} title="Détail du devis">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-medium">{LIBELLE_INTERVENTION[devis.buteeDeclenchanteType]}</p>
          <StatutDevisBadge statut={statut} />
        </div>

        <div className="mb-4 space-y-2">
          {devis.lignes.map((l, i) => (
            <div key={i} className="flex items-center justify-between rounded-md border border-border p-3 text-sm">
              <span>{l.libelle}</span>
              <span>{formatEuro(l.quantite * l.prixUnitaireHT)}</span>
            </div>
          ))}
        </div>

        <div className="mb-6 rounded-md bg-muted/50 p-3">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Total HT</span>
            <span>{formatEuro(devis.totalHT)}</span>
          </div>
          <div className="flex justify-between text-base font-medium">
            <span>Total TTC</span>
            <span>{formatEuro(devis.totalTTC)}</span>
          </div>
        </div>

        <div className="rounded-md bg-primary-50 p-3 text-xs text-primary-800">
          Prix pièces référence Autodata · barème temps constructeur × votre taux horaire.
        </div>

        <div className="mt-6 flex gap-2">
          {statut === "BROUILLON" && (
            <Button variant="primary" className="flex-1" onClick={() => setStatut("VALIDE_GARAGE")}>
              Valider le devis
            </Button>
          )}
          {statut === "VALIDE_GARAGE" && (
            <Button variant="primary" className="flex-1" onClick={() => setConfirmEnvoi(true)}>
              Envoyer au client
            </Button>
          )}
          {statut === "ENVOYE_CLIENT" && (
            <p className="w-full text-center text-sm text-muted-foreground">Devis envoyé, en attente de réponse client.</p>
          )}
        </div>
      </Drawer>

      <Dialog open={confirmEnvoi} onClose={() => setConfirmEnvoi(false)} title="Confirmer l'envoi ?">
        <p className="mb-4 text-sm text-muted-foreground">
          Le devis va être transmis au client. Cette action n'est jamais automatique — vous la
          déclenchez explicitement.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setConfirmEnvoi(false)}>
            Annuler
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setStatut("ENVOYE_CLIENT");
              setConfirmEnvoi(false);
            }}
          >
            Confirmer l'envoi
          </Button>
        </div>
      </Dialog>
    </>
  );
}
