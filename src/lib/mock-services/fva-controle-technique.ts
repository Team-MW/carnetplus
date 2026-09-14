// MOCK — Vérification FVA (Fichier des Véhicules Assurés) et rattachement
// du contrôle technique. Voir dossier de spécifications, section 7 :
// accès public FVA ouvert depuis le 13/02/2026, nécessite immatriculation
// + numéro de formule de la carte grise.

import type { StatutAssurance } from "../types";

export async function verifierAssuranceFva(
  _immatriculation: string,
  numeroFormule?: string
): Promise<StatutAssurance> {
  await delay(500);
  if (!numeroFormule) return "inconnu";
  return "assure";
}

export interface ControleTechniqueResult {
  dateControle: string; // ISO
  dateProchainControle: string; // ISO
  resultat: "favorable" | "defavorable" | "contre_visite";
  documentUrl?: string;
}

export async function importerControleTechnique(
  _fichierNomOuUrl: string
): Promise<ControleTechniqueResult> {
  await delay(800);
  const dateControle = new Date();
  const dateProchain = new Date(dateControle);
  dateProchain.setFullYear(dateProchain.getFullYear() + 1);
  return {
    dateControle: dateControle.toISOString(),
    dateProchainControle: dateProchain.toISOString(),
    resultat: "favorable",
  };
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
