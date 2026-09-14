"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { extraireFacture, type ExtractionFactureResult } from "@/lib/mock-services/ocr-facture";
import { Upload, CheckCircle2, AlertTriangle } from "lucide-react";
import { formatEuro } from "@/lib/utils";

export function DeposerFactureButton() {
  const [open, setOpen] = useState(false);
  const [etape, setEtape] = useState<"depot" | "extraction" | "revue" | "confirme">("depot");
  const [resultat, setResultat] = useState<ExtractionFactureResult | null>(null);

  async function deposerFacture() {
    setEtape("extraction");
    const res = await extraireFacture("facture-demo.pdf");
    setResultat(res);
    setEtape("revue");
  }

  function reinitialiser() {
    setOpen(false);
    setEtape("depot");
    setResultat(null);
  }

  function classerLigne(index: number) {
    if (!resultat) return;
    const lignes = resultat.lignes.map((l, i) => (i === index ? { ...l, statut: "VALIDEE" as const } : l));
    setResultat({ ...resultat, lignes });
  }

  const nbACorrigier = resultat?.lignes.filter((l) => l.statut === "A_CORRIGER").length ?? 0;

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        <Upload size={16} /> Déposer une facture
      </Button>

      <Dialog open={open} onClose={reinitialiser} title="Dépôt de facture">
        {etape === "depot" && (
          <div className="space-y-4">
            <div
              className="cursor-pointer rounded-md border border-dashed border-border p-8 text-center hover:bg-muted/40"
              onClick={deposerFacture}
            >
              <Upload size={22} className="mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm">Cliquez pour simuler le dépôt d'une facture (PDF)</p>
            </div>
          </div>
        )}

        {etape === "extraction" && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Extraction automatique du véhicule, de la date, du kilométrage et des lignes en cours…
          </p>
        )}

        {etape === "revue" && resultat && (
          <div className="space-y-4">
            <div className="rounded-md bg-muted/50 p-3 text-xs text-muted-foreground">
              Véhicule reconnu : {resultat.immatriculationDetectee} · km relevé {resultat.kilometrageDetecte}
            </div>
            <div className="space-y-2">
              {resultat.lignes.map((l, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-md border border-border p-3">
                  <div className="flex items-center gap-2">
                    {l.statut === "VALIDEE" ? (
                      <CheckCircle2 size={15} className="text-primary-600" />
                    ) : (
                      <AlertTriangle size={15} className="text-warning-400" />
                    )}
                    <div>
                      <p className="text-sm">{l.libelle}</p>
                      {l.statut === "A_CORRIGER" && (
                        <p className="text-xs text-warning-600">Ligne non reconnue — à classer manuellement</p>
                      )}
                    </div>
                  </div>
                  <span className="text-sm">{formatEuro(l.montantHT)}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {resultat.lignes.length - nbACorrigier} ligne(s) prête(s) à ventiler
              {nbACorrigier > 0 ? ` · ${nbACorrigier} à corriger avant validation` : ""}.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={reinitialiser}>
                Annuler
              </Button>
              <Button
                variant="primary"
                disabled={nbACorrigier > 0}
                onClick={() => setEtape("confirme")}
              >
                Valider et ventiler
              </Button>
            </div>
            {nbACorrigier > 0 && (
              <p className="text-xs text-danger-600">
                Corrigez ou classez la ligne signalée avant de pouvoir valider (règle zéro double saisie
                sans erreur silencieuse).
              </p>
            )}
          </div>
        )}

        {etape === "confirme" && (
          <div className="space-y-4 py-4 text-center">
            <CheckCircle2 size={32} className="mx-auto text-primary-600" />
            <p className="text-sm font-medium">Intervention ventilée dans le Kardex</p>
            <Button variant="secondary" onClick={reinitialiser}>
              Fermer
            </Button>
          </div>
        )}
      </Dialog>
    </>
  );
}
