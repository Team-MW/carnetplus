import type {
  Utilisateur,
  Garage,
  Vehicule,
  ButeeEntretien,
  Intervention,
  AutorisationAcces,
  Devis,
} from "./types";

function moisAvant(n: number): string {
  const d = new Date();
  d.setMonth(d.getMonth() - n);
  return d.toISOString();
}

export const utilisateurs: Utilisateur[] = [
  { id: "u-marie", email: "marie.dupont@example.com", nom: "Marie Dupont", role: "PARTICULIER" },
  { id: "u-garage-martin", email: "contact@garage-martin.fr", nom: "Garage Martin", role: "GARAGE" },
  { id: "u-garage-nord", email: "contact@auto-nord.fr", nom: "Auto Nord Services", role: "GARAGE" },
];

export const garages: Garage[] = [
  { id: "g-martin", utilisateurId: "u-garage-martin", nom: "Garage Martin", siret: "812 345 678 00012", tauxHoraireHT: 62, badgeVerifie: true },
  { id: "g-nord", utilisateurId: "u-garage-nord", nom: "Auto Nord Services", siret: "798 123 456 00023", tauxHoraireHT: 58, badgeVerifie: false },
];

export const vehicules: Vehicule[] = [
  {
    id: "v-308",
    vin: "VF3XPEUGEOT308",
    immatriculation: "AB-123-CD",
    numeroFormule: "2019AB12345",
    marque: "Peugeot",
    modele: "308",
    motorisation: "1.5 BlueHDi 130",
    dateMiseCirculation: "2019-03-15",
    kilometrageCourant: 68400,
    typeVehicule: "automobile",
    proprietaireId: "u-marie",
    garageTitulaireId: "g-martin",
    statutAssuranceFva: "assure",
    dateProchainCT: "2027-03-10",
  },
  {
    id: "v-clio",
    vin: "VF1RENAULTCLIO5",
    immatriculation: "CD-456-EF",
    numeroFormule: "2016CD67890",
    marque: "Renault",
    modele: "Clio",
    motorisation: "1.2 TCe 100",
    dateMiseCirculation: "2016-06-01",
    kilometrageCourant: 112300,
    typeVehicule: "automobile",
    proprietaireId: "u-marie",
    garageTitulaireId: "g-martin",
    statutAssuranceFva: "assure",
    dateProchainCT: "2026-11-20",
  },
  {
    id: "v-xmax",
    vin: "JYAYAMAHAXMAX300",
    immatriculation: "GH-789-IJ",
    numeroFormule: "2022GH11223",
    marque: "Yamaha",
    modele: "XMAX 300",
    motorisation: "300cc",
    dateMiseCirculation: "2022-05-10",
    kilometrageCourant: 8200,
    typeVehicule: "moto",
    proprietaireId: "u-marie",
    statutAssuranceFva: "assure",
    dateProchainCT: undefined,
  },
];

export const butees: ButeeEntretien[] = [
  // Peugeot 308 — reproduit exactement les 4 butées déjà validées
  {
    id: "b-308-frein",
    vehiculeId: "v-308",
    typeIntervention: "LIQUIDE_FREIN",
    dateDerniereIntervention: "2024-03-12",
    kmDerniereIntervention: 52000,
    intervalleMoisDefaut: 24,
    intervalleKmDefaut: 30000,
    sourceIntervalle: "GENERIQUE_DEFAUT",
  },
  {
    id: "b-308-plaquettes",
    vehiculeId: "v-308",
    typeIntervention: "PLAQUETTES_FREIN",
    dateDerniereIntervention: new Date().toISOString().slice(0, 10),
    kmDerniereIntervention: 68400,
    intervalleMoisDefaut: 24,
    intervalleKmDefaut: 30000,
    sourceIntervalle: "GENERIQUE_DEFAUT",
  },
  {
    id: "b-308-distribution",
    vehiculeId: "v-308",
    typeIntervention: "DISTRIBUTION",
    dateDerniereIntervention: "2022-06-05",
    kmDerniereIntervention: 30000,
    intervalleMoisDefaut: 60,
    intervalleKmDefaut: 100000,
    sourceIntervalle: "GENERIQUE_DEFAUT",
  },
  {
    id: "b-308-vidange",
    vehiculeId: "v-308",
    typeIntervention: "VIDANGE",
    dateDerniereIntervention: "2026-01-20",
    kmDerniereIntervention: 65000,
    intervalleMoisDefaut: 12,
    intervalleKmDefaut: 15000,
    sourceIntervalle: "GENERIQUE_DEFAUT",
  },
  // Clio
  {
    id: "b-clio-vidange",
    vehiculeId: "v-clio",
    typeIntervention: "VIDANGE",
    dateDerniereIntervention: "2025-10-02",
    kmDerniereIntervention: 105000,
    intervalleMoisDefaut: 12,
    intervalleKmDefaut: 15000,
    sourceIntervalle: "GENERIQUE_DEFAUT",
  },
  {
    id: "b-clio-pneus",
    vehiculeId: "v-clio",
    typeIntervention: "PNEUS",
    dateDerniereIntervention: "2023-04-01",
    kmDerniereIntervention: 70000,
    intervalleMoisDefaut: 48,
    intervalleKmDefaut: 40000,
    sourceIntervalle: "GENERIQUE_DEFAUT",
  },
  // XMax
  {
    id: "b-xmax-vidange",
    vehiculeId: "v-xmax",
    typeIntervention: "VIDANGE",
    dateDerniereIntervention: "2026-04-15",
    kmDerniereIntervention: 6000,
    intervalleMoisDefaut: 12,
    intervalleKmDefaut: 10000,
    sourceIntervalle: "GENERIQUE_DEFAUT",
  },
];

export const interventions: Intervention[] = [
  {
    id: "i-308-1",
    vehiculeId: "v-308",
    garageId: "g-martin",
    date: "2026-01-20",
    kilometrage: 65000,
    typeIntervention: "VIDANGE",
    factureSourceUrl: "/mock/factures/facture-vidange-308.pdf",
    lignesFacture: [
      { id: "lf-1", libelle: "Vidange huile moteur 5W30", montantHT: 42, statut: "VALIDEE" },
      { id: "lf-2", libelle: "Filtre à huile", montantHT: 14.5, statut: "VALIDEE" },
    ],
  },
  {
    id: "i-308-2",
    vehiculeId: "v-308",
    garageId: "g-martin",
    date: new Date().toISOString().slice(0, 10),
    kilometrage: 68400,
    typeIntervention: "PLAQUETTES_FREIN",
    factureSourceUrl: "/mock/factures/facture-plaquettes-308.pdf",
    lignesFacture: [
      { id: "lf-3", libelle: "Plaquettes de frein avant (jeu x1)", montantHT: 68, statut: "VALIDEE" },
      { id: "lf-4", libelle: "Main d'œuvre (0,8 h)", montantHT: 49.6, statut: "VALIDEE" },
    ],
    dossierTravaux: {
      id: "dt-308-2",
      interventionId: "i-308-2",
      photoEtiquetteUrl: "/mock/photos/etiquette-plaquettes.jpg",
      photoPieceNeuveUrl: "/mock/photos/piece-neuve-plaquettes.jpg",
      photoPieceInstalleeUrl: "/mock/photos/piece-installee-plaquettes.jpg",
      photoPieceUsageeUrl: "/mock/photos/piece-usagee-plaquettes.jpg",
      horodatageServeur: new Date().toISOString(),
      geoLat: 48.8566,
      geoLng: 2.3522,
      hashEtiquette: "a3f5c9...e21",
      hashPieceNeuve: "b7d2e1...f44",
      hashPieceInstallee: "c9a1f0...123",
      hashPieceUsagee: "d4e8b2...987",
      commentaireIa:
        "Plaquettes avant gauche et droite, référence conforme à l'étiquette. Usure avancée visible sur la pièce déposée, épaisseur résiduelle faible. Montage neuf confirmé par comparaison visuelle avant/après.",
    },
  },
  {
    id: "i-clio-1",
    vehiculeId: "v-clio",
    garageId: "g-martin",
    date: "2025-10-02",
    kilometrage: 105000,
    typeIntervention: "VIDANGE",
    lignesFacture: [
      { id: "lf-5", libelle: "Vidange huile moteur", montantHT: 45, statut: "VALIDEE" },
    ],
  },
];

export const autorisationsAcces: AutorisationAcces[] = [
  { id: "a-1", vehiculeId: "v-308", garageId: "g-martin", type: "PERMANENTE", dateOctroi: moisAvant(14), octroyeeParId: "u-marie" },
  { id: "a-2", vehiculeId: "v-clio", garageId: "g-martin", type: "PERMANENTE", dateOctroi: moisAvant(20), octroyeeParId: "u-marie" },
  { id: "a-3", vehiculeId: "v-xmax", garageId: "g-nord", type: "PONCTUELLE", dateOctroi: moisAvant(1), octroyeeParId: "u-marie" },
];

export const devisList: Devis[] = [
  {
    id: "d-1",
    vehiculeId: "v-308",
    garageId: "g-martin",
    buteeDeclenchanteType: "LIQUIDE_FREIN",
    lignes: [
      { libelle: "Liquide de frein DOT4 (1L)", quantite: 1, prixUnitaireHT: 22, type: "piece" },
      { libelle: "Main d'œuvre (0,5 h)", quantite: 0.5, prixUnitaireHT: 62, type: "main_oeuvre" },
    ],
    totalHT: 53,
    totalTTC: 63.6,
    statut: "BROUILLON",
    createdAt: new Date().toISOString(),
  },
  {
    id: "d-2",
    vehiculeId: "v-clio",
    garageId: "g-martin",
    buteeDeclenchanteType: "PNEUS",
    lignes: [
      { libelle: "Pneus (jeu de 4)", quantite: 4, prixUnitaireHT: 110, type: "piece" },
      { libelle: "Main d'œuvre (0,3 h × 4)", quantite: 1.2, prixUnitaireHT: 62, type: "main_oeuvre" },
    ],
    totalHT: 514.4,
    totalTTC: 617.28,
    statut: "VALIDE_GARAGE",
    createdAt: new Date().toISOString(),
  },
];
