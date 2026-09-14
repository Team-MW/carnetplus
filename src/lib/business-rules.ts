import type {
  ButeeEntretien,
  ButeeCalculee,
  StatutButee,
  Intervention,
  Garage,
  LigneDevis,
} from "./types";

/**
 * RÈGLE 6.2 — Double butée (calendaire + kilométrique), indépendantes.
 *
 * - Les deux échéances (date et kilométrage) sont calculées séparément.
 * - Le statut retient TOUJOURS l'échéance la plus proche des deux
 *   (jamais une moyenne).
 * - Fenêtres d'alerte par défaut : 2 mois ou 2 000 km avant l'échéance
 *   déclenchent "BIENTOT_DU". Le dépassement de l'une des deux déclenche
 *   "DEPASSE", même si l'autre est encore loin.
 */
const FENETRE_ALERTE_MOIS = 2;
const FENETRE_ALERTE_KM = 2000;

export function calculerButee(
  butee: ButeeEntretien,
  kilometrageActuelVehicule: number,
  maintenant: Date = new Date()
): ButeeCalculee {
  const dateDerniere = new Date(butee.dateDerniereIntervention);

  const buteeDate = new Date(dateDerniere);
  buteeDate.setMonth(buteeDate.getMonth() + butee.intervalleMoisDefaut);

  const buteeKm = butee.kmDerniereIntervention + butee.intervalleKmDefaut;

  const moisRestants = moisEntre(maintenant, buteeDate);
  const kmRestants = buteeKm - kilometrageActuelVehicule;

  const dateDepassee = maintenant.getTime() >= buteeDate.getTime();
  const kmDepasse = kilometrageActuelVehicule >= buteeKm;

  const dateBientotDue = !dateDepassee && moisRestants <= FENETRE_ALERTE_MOIS;
  const kmBientotDu = !kmDepasse && kmRestants <= FENETRE_ALERTE_KM;

  let statut: StatutButee = "OK";
  // Une seule des deux échéances dépassée suffit à déclencher "DEPASSE".
  if (dateDepassee || kmDepasse) {
    statut = "DEPASSE";
  } else if (dateBientotDue || kmBientotDu) {
    // Une seule des deux qui approche suffit à déclencher "BIENTOT_DU".
    statut = "BIENTOT_DU";
  }

  return {
    ...butee,
    buteeDate: buteeDate.toISOString(),
    buteeKm,
    statut,
    moisRestants,
    kmRestants,
  };
}

function moisEntre(a: Date, b: Date): number {
  return (
    (b.getFullYear() - a.getFullYear()) * 12 +
    (b.getMonth() - a.getMonth()) +
    (b.getDate() >= a.getDate() ? 0 : -1)
  );
}

/**
 * RÈGLE 6.1 — Garage titulaire.
 * Le titulaire est le garage ayant enregistré la DERNIÈRE intervention
 * validée sur le véhicule. Recalculé à chaque nouvelle intervention.
 * Un véhicule sans intervention n'a pas de titulaire.
 */
export function calculerGarageTitulaire(
  interventions: Intervention[]
): string | undefined {
  if (interventions.length === 0) return undefined;
  const derniere = [...interventions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];
  return derniere.garageId;
}

/**
 * RÈGLE 6.6 — Devis automatique.
 * Un devis n'est proposé qu'au garage titulaire, uniquement quand une
 * butée passe en "BIENTOT_DU" ou "DEPASSE". Il reste en statut
 * "BROUILLON" tant que le garagiste ne l'a pas validé manuellement.
 * Aucun envoi automatique n'est permis (voir statut ENVOYE_CLIENT,
 * jamais positionné automatiquement).
 */
export function genererLignesDevis(
  butee: ButeeCalculee,
  garage: Garage,
  prixPieceRefHT: number,
  tempsBaremeHeures: number
): LigneDevis[] {
  return [
    {
      libelle: `Pièce(s) — référence Autodata`,
      quantite: 1,
      prixUnitaireHT: prixPieceRefHT,
      type: "piece",
    },
    {
      libelle: `Main d'œuvre (${tempsBaremeHeures} h × ${garage.tauxHoraireHT} €/h)`,
      quantite: tempsBaremeHeures,
      prixUnitaireHT: garage.tauxHoraireHT,
      type: "main_oeuvre",
    },
  ];
}

export function calculerTotaux(lignes: LigneDevis[]) {
  const totalHT = lignes.reduce(
    (sum, l) => sum + l.quantite * l.prixUnitaireHT,
    0
  );
  const totalTTC = totalHT * 1.2;
  return { totalHT: round2(totalHT), totalTTC: round2(totalTTC) };
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

/**
 * RÈGLE 6.5 — Permissions multi-garage.
 * Un garage ne peut lire/écrire sur un véhicule que s'il a une
 * autorisation active (non révoquée). Une autorisation ponctuelle
 * n'est valable que pour l'intervention en cours.
 */
export function garageADroitAcces(
  autorisations: { garageId: string; dateRevocation?: string }[],
  garageId: string
): boolean {
  return autorisations.some(
    (a) => a.garageId === garageId && !a.dateRevocation
  );
}

/**
 * RÈGLE 6.4 — Un dossier travaux n'est valide que si les 4 photos de
 * preuve sont présentes (séquence complète obligatoire).
 */
export function dossierTravauxEstComplet(dossier: {
  photoEtiquetteUrl?: string;
  photoPieceNeuveUrl?: string;
  photoPieceInstalleeUrl?: string;
  photoPieceUsageeUrl?: string;
}): boolean {
  return Boolean(
    dossier.photoEtiquetteUrl &&
      dossier.photoPieceNeuveUrl &&
      dossier.photoPieceInstalleeUrl &&
      dossier.photoPieceUsageeUrl
  );
}
