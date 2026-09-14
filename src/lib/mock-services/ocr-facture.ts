// MOCK — simule l'extraction OCR d'une facture déposée par le garage.
// Règle 6.3 : zéro double saisie — véhicule, date, km et lignes sont
// extraits automatiquement ; les lignes incertaines sont marquées
// "A_CORRIGER" et bloquent la validation tant qu'elles ne sont pas traitées.

import type { StatutLigneFacture, TypeIntervention } from "../types";

export interface LigneFactureExtraite {
  libelle: string;
  montantHT: number;
  statut: StatutLigneFacture;
  typeInterventionDetecte?: TypeIntervention;
}

export interface ExtractionFactureResult {
  vinDetecte?: string;
  immatriculationDetectee: string;
  dateFacture: string; // ISO
  kilometrageDetecte: number;
  lignes: LigneFactureExtraite[];
}

export async function extraireFacture(
  _fichierNomOuUrl: string
): Promise<ExtractionFactureResult> {
  await delay(1200);
  // Résultat de démonstration reproduisant le flux OCR déjà validé :
  // 2 lignes reconnues avec confiance, 1 ligne ambiguë à corriger.
  return {
    immatriculationDetectee: "AB-123-CD",
    dateFacture: new Date().toISOString(),
    kilometrageDetecte: 68400,
    lignes: [
      {
        libelle: "Liquide de frein DOT4 (1L)",
        montantHT: 22,
        statut: "VALIDEE",
        typeInterventionDetecte: "LIQUIDE_FREIN",
      },
      {
        libelle: "Plaquettes de frein avant (jeu x1)",
        montantHT: 68,
        statut: "VALIDEE",
        typeInterventionDetecte: "PLAQUETTES_FREIN",
      },
      {
        libelle: "Divers atelier",
        montantHT: 12.5,
        statut: "A_CORRIGER",
      },
    ],
  };
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
