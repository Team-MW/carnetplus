// MOCK — à remplacer par un vrai fournisseur de décodage VIN.
// Simule une latence réseau réaliste et un résultat plausible.

export interface VinDecodeResult {
  vin: string;
  marque: string;
  modele: string;
  motorisation: string;
  dateMiseCirculation: string; // ISO
}

const BASE_CONNUE: Record<string, Omit<VinDecodeResult, "vin">> = {
  VF3XPEUGEOT308: {
    marque: "Peugeot",
    modele: "308",
    motorisation: "1.5 BlueHDi 130",
    dateMiseCirculation: "2019-03-15",
  },
};

export async function decoderVin(vin: string): Promise<VinDecodeResult> {
  await delay(600);
  const connu = BASE_CONNUE[vin];
  if (connu) return { vin, ...connu };
  // Résultat générique plausible si le VIN n'est pas dans le jeu de démo
  return {
    vin,
    marque: "Marque inconnue",
    modele: "Modèle à confirmer",
    motorisation: "Non déterminée",
    dateMiseCirculation: new Date().toISOString(),
  };
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
