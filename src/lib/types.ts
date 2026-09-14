export type RoleUtilisateur = "PARTICULIER" | "GARAGE";

export type TypeIntervention =
  | "VIDANGE"
  | "PLAQUETTES_FREIN"
  | "LIQUIDE_FREIN"
  | "DISTRIBUTION"
  | "PNEUS"
  | "BATTERIE"
  | "AUTRE";

export const LIBELLE_INTERVENTION: Record<TypeIntervention, string> = {
  VIDANGE: "Vidange moteur",
  PLAQUETTES_FREIN: "Plaquettes de frein",
  LIQUIDE_FREIN: "Liquide de frein",
  DISTRIBUTION: "Courroie de distribution",
  PNEUS: "Pneus",
  BATTERIE: "Batterie",
  AUTRE: "Autre intervention",
};

export type SourceIntervalle = "CONSTRUCTEUR_PRECIS" | "GENERIQUE_DEFAUT";
export type StatutButee = "OK" | "BIENTOT_DU" | "DEPASSE";
export type TypeAutorisation = "PERMANENTE" | "PONCTUELLE";
export type StatutDevis = "BROUILLON" | "VALIDE_GARAGE" | "ENVOYE_CLIENT" | "ACCEPTE" | "REFUSE";
export type StatutLigneFacture = "VALIDEE" | "A_CORRIGER";
export type StatutAssurance = "assure" | "non_assure" | "inconnu";
export type TypeVehiculeCategorie = "automobile" | "moto" | "poids_lourd" | "autocar";

export interface Utilisateur {
  id: string;
  email: string;
  nom: string;
  role: RoleUtilisateur;
}

export interface Garage {
  id: string;
  utilisateurId: string;
  nom: string;
  siret?: string;
  tauxHoraireHT: number;
  badgeVerifie: boolean;
}

export interface Vehicule {
  id: string;
  vin: string;
  immatriculation: string;
  numeroFormule?: string;
  marque: string;
  modele: string;
  motorisation?: string;
  dateMiseCirculation?: string; // ISO
  kilometrageCourant: number;
  typeVehicule: TypeVehiculeCategorie;
  proprietaireId: string;
  garageTitulaireId?: string;
  statutAssuranceFva?: StatutAssurance;
  dateProchainCT?: string; // ISO
}

export interface ButeeEntretien {
  id: string;
  vehiculeId: string;
  typeIntervention: TypeIntervention;
  dateDerniereIntervention: string; // ISO
  kmDerniereIntervention: number;
  intervalleMoisDefaut: number;
  intervalleKmDefaut: number;
  sourceIntervalle: SourceIntervalle;
}

export interface LigneFacture {
  id: string;
  libelle: string;
  montantHT: number;
  statut: StatutLigneFacture;
}

export interface DossierTravaux {
  id: string;
  interventionId: string;
  photoEtiquetteUrl: string;
  photoPieceNeuveUrl: string;
  photoPieceInstalleeUrl: string;
  photoPieceUsageeUrl: string;
  horodatageServeur: string; // ISO
  geoLat?: number;
  geoLng?: number;
  hashEtiquette: string;
  hashPieceNeuve: string;
  hashPieceInstallee: string;
  hashPieceUsagee: string;
  commentaireIa?: string;
}

export interface Intervention {
  id: string;
  vehiculeId: string;
  garageId: string;
  date: string; // ISO
  kilometrage: number;
  typeIntervention: TypeIntervention;
  factureSourceUrl?: string;
  lignesFacture: LigneFacture[];
  dossierTravaux?: DossierTravaux;
}

export interface AutorisationAcces {
  id: string;
  vehiculeId: string;
  garageId: string;
  type: TypeAutorisation;
  dateOctroi: string; // ISO
  dateRevocation?: string; // ISO
  octroyeeParId: string;
}

export interface LigneDevis {
  libelle: string;
  quantite: number;
  prixUnitaireHT: number;
  type: "piece" | "main_oeuvre";
}

export interface Devis {
  id: string;
  vehiculeId: string;
  garageId: string;
  buteeDeclenchanteType: TypeIntervention;
  lignes: LigneDevis[];
  totalHT: number;
  totalTTC: number;
  statut: StatutDevis;
  dateEnvoi?: string; // ISO
  createdAt: string; // ISO
}

export interface JournalAccesEntry {
  id: string;
  utilisateurId: string;
  action: "lecture" | "ecriture" | "revocation" | "octroi";
  cible: string;
  createdAt: string; // ISO
}

// Vue calculée, jamais stockée telle quelle — voir business-rules.ts
export interface ButeeCalculee extends ButeeEntretien {
  buteeDate: string; // ISO, calculée
  buteeKm: number; // calculée
  statut: StatutButee;
  moisRestants: number;
  kmRestants: number;
}
