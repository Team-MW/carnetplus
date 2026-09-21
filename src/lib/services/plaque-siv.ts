/**
 * Intégration réelle — Api plaque immatriculation SIV (RapidAPI).
 * https://rapidapi.com/api-plaque-immatriculation-siv-api-plaque-immatriculation-siv-default/api/api-plaque-immatriculation-siv
 *
 * À appeler uniquement côté serveur (clé RapidAPI dans les variables d'env).
 */

export interface PneuSiv {
  name: string;
  width: number;
  height: number;
  diameter: number;
  load_index: number;
  speed_index: string;
}

export interface VehiculeInfoSiv {
  erreur: string;
  immat: string;
  pays: string;
  marque: string;
  modele: string;
  modele_en: string;
  version: string;
  debut_modele: string;
  fin_modele: string;
  date1erCir_us: string;
  date1erCir_fr: string;
  co2: string;
  energie: string;
  energieNGC: string;
  type_moteur: string;
  genreVCG: string;
  genreVCGNGC: string;
  puisFisc: string;
  carrosserieCG: string;
  code_carrosserie: string;
  carrosserie: string;
  code_type_transmission: string;
  type_transmission: string;
  capacite_litres: string;
  code_systeme_alimentation: string;
  systeme_alimentation: string;
  valves: string;
  puisFiscReelKW: string;
  puisFiscReelCH: string;
  collection: string;
  vin: string;
  variante: string;
  boite_vitesse: string;
  code_boite_vitesse: string;
  nr_passagers: string;
  nb_portes: string;
  type_mine: string;
  cnit: string;
  couleur: string;
  poids: string;
  ptac: string;
  ccm: string;
  cylindres: string;
  propulsion: string;
  type_compression: string;
  longueur: string;
  largeur: string;
  hauteur: string;
  empattement: string;
  sra_id: string;
  sra_group: string;
  sra_commercial: string;
  numero_serie: string;
  logo_marque: string;
  photo_modele: string;
  k_type: string;
  tecdoc_manu_id: string;
  tecdoc_model_id: string;
  tecdoc_car_id: string;
  tecdoc_vehicules_compatible: string;
  code_moteur: string;
  codes_platforme: string;
  liste_sra_commercial: string | null;
  pneus: PneuSiv[];
}

export interface PlaqueSivResponse {
  data: VehiculeInfoSiv;
  api_version: string;
  message: string;
  code_erreur: number;
}

const HOST = "api-plaque-immatriculation-siv.p.rapidapi.com";
const DEFAULT_HOST_NAME = "https://apiplaqueimmatriculation.com";

export function normaliserImmatriculation(immat: string): string {
  return immat
    .trim()
    .toUpperCase()
    .replace(/[\s._]/g, "-")
    .replace(/-+/g, "-");
}

export async function getVehiculeInfoParImmatriculation(
  immatriculation: string
): Promise<PlaqueSivResponse> {
  const immat = normaliserImmatriculation(immatriculation);
  if (!immat) {
    throw new Error("Immatriculation requise");
  }

  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) {
    throw new Error("RAPIDAPI_KEY manquante dans l'environnement");
  }

  const token = process.env.PLAQUE_SIV_TOKEN ?? "TokenDemoRapidapi";
  const hostName = process.env.PLAQUE_SIV_HOST_NAME ?? DEFAULT_HOST_NAME;

  const params = new URLSearchParams({
    token,
    host_name: hostName,
    immatriculation: immat,
  });

  const res = await fetch(`https://${HOST}/get-vehicule-info?${params}`, {
    method: "GET",
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": HOST,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Erreur RapidAPI (${res.status})`);
  }

  const json = (await res.json()) as PlaqueSivResponse;

  if (json.code_erreur && json.code_erreur !== 200) {
    throw new Error(json.message || json.data?.erreur || "Véhicule introuvable");
  }

  if (json.data?.erreur) {
    throw new Error(json.data.erreur);
  }

  return json;
}
