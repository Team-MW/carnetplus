// MOCK — à remplacer par l'intégration réelle Autodata (offre "Service et
// Entretien") une fois l'accès API et les conditions de licence confirmés.
// Voir dossier de spécifications, section 7.

import type { TypeIntervention } from "../types";

export interface PreconisationConstructeur {
  intervalleMoisDefaut: number;
  intervalleKmDefaut: number;
  tempsBaremeHeures: number;
  prixPieceRefHT: number;
}

const REFERENTIEL_GENERIQUE: Record<TypeIntervention, PreconisationConstructeur> = {
  VIDANGE: { intervalleMoisDefaut: 12, intervalleKmDefaut: 15000, tempsBaremeHeures: 0.4, prixPieceRefHT: 56.5 },
  PLAQUETTES_FREIN: { intervalleMoisDefaut: 24, intervalleKmDefaut: 30000, tempsBaremeHeures: 0.8, prixPieceRefHT: 68 },
  LIQUIDE_FREIN: { intervalleMoisDefaut: 24, intervalleKmDefaut: 30000, tempsBaremeHeures: 0.5, prixPieceRefHT: 22 },
  DISTRIBUTION: { intervalleMoisDefaut: 60, intervalleKmDefaut: 130000, tempsBaremeHeures: 3.5, prixPieceRefHT: 320 },
  PNEUS: { intervalleMoisDefaut: 48, intervalleKmDefaut: 40000, tempsBaremeHeures: 0.3, prixPieceRefHT: 110 },
  BATTERIE: { intervalleMoisDefaut: 48, intervalleKmDefaut: 60000, tempsBaremeHeures: 0.2, prixPieceRefHT: 95 },
  AUTRE: { intervalleMoisDefaut: 12, intervalleKmDefaut: 15000, tempsBaremeHeures: 1, prixPieceRefHT: 50 },
};

export async function getPreconisation(
  typeIntervention: TypeIntervention,
  _marque?: string,
  _modele?: string,
  _motorisation?: string
): Promise<PreconisationConstructeur> {
  await delay(400);
  // En V1 réelle : requête Autodata filtrée par marque/modèle/motorisation.
  // Ici : référentiel générique par type d'intervention (cf. business-rules
  // "source_intervalle: GENERIQUE_DEFAUT").
  return REFERENTIEL_GENERIQUE[typeIntervention];
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
