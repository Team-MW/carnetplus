// Couche repository : c'est la SEULE couche que les écrans appellent pour
// lire/écrire des données. Aujourd'hui elle lit le jeu de données mock en
// mémoire ; demain, chaque fonction sera remplacée par une requête Prisma
// équivalente sans que les composants aient à changer.

import {
  utilisateurs,
  garages,
  vehicules,
  butees,
  interventions,
  autorisationsAcces,
  devisList,
} from "../mock-data";
import { calculerButee, calculerGarageTitulaire, garageADroitAcces } from "../business-rules";
import type { ButeeCalculee, Vehicule, Devis } from "../types";

export function getUtilisateurCourant(role: "PARTICULIER" | "GARAGE" = "PARTICULIER") {
  return role === "PARTICULIER"
    ? utilisateurs.find((u) => u.role === "PARTICULIER")!
    : utilisateurs.find((u) => u.id === "u-garage-martin")!;
}

export function getGarageCourant() {
  return garages.find((g) => g.id === "g-martin")!;
}

export function getVehiculesDuProprietaire(proprietaireId: string): Vehicule[] {
  return vehicules.filter((v) => v.proprietaireId === proprietaireId);
}

export function getVehiculeParId(id: string): Vehicule | undefined {
  return vehicules.find((v) => v.id === id);
}

export function getButeesDuVehicule(vehiculeId: string): ButeeCalculee[] {
  const vehicule = getVehiculeParId(vehiculeId);
  if (!vehicule) return [];
  return butees
    .filter((b) => b.vehiculeId === vehiculeId)
    .map((b) => calculerButee(b, vehicule.kilometrageCourant));
}

export function getToutesButeesCalculees(): (ButeeCalculee & { vehicule: Vehicule })[] {
  return vehicules.flatMap((v) =>
    getButeesDuVehicule(v.id).map((b) => ({ ...b, vehicule: v }))
  );
}

export function getInterventionsDuVehicule(vehiculeId: string) {
  return interventions
    .filter((i) => i.vehiculeId === vehiculeId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getGarageTitulaireActuel(vehiculeId: string) {
  const interventionsVehicule = interventions.filter((i) => i.vehiculeId === vehiculeId);
  const garageId = calculerGarageTitulaire(interventionsVehicule);
  return garages.find((g) => g.id === garageId);
}

export function getAutorisationsDuVehicule(vehiculeId: string) {
  return autorisationsAcces.filter((a) => a.vehiculeId === vehiculeId);
}

export function getGarageParId(id: string) {
  return garages.find((g) => g.id === id);
}

export function garagePeutAccederAuVehicule(garageId: string, vehiculeId: string) {
  const autorisations = getAutorisationsDuVehicule(vehiculeId);
  return garageADroitAcces(autorisations, garageId);
}

// --- Vue "espace garage" ---

export function getVehiculesAccessiblesParGarage(garageId: string): Vehicule[] {
  const vehiculeIds = autorisationsAcces
    .filter((a) => a.garageId === garageId && !a.dateRevocation)
    .map((a) => a.vehiculeId);
  return vehicules.filter((v) => vehiculeIds.includes(v.id));
}

export function getVehiculesOuGarageEstTitulaire(garageId: string): Vehicule[] {
  return getVehiculesAccessiblesParGarage(garageId).filter((v) => {
    const titulaire = getGarageTitulaireActuel(v.id);
    return titulaire?.id === garageId;
  });
}

export function getDevisDuGarage(garageId: string): Devis[] {
  return devisList.filter((d) => d.garageId === garageId);
}

export function getButeesBientotDuesPourGarageTitulaire(
  garageId: string
): (ButeeCalculee & { vehicule: Vehicule })[] {
  return getVehiculesOuGarageEstTitulaire(garageId).flatMap((v) =>
    getButeesDuVehicule(v.id)
      .filter((b) => b.statut === "BIENTOT_DU" || b.statut === "DEPASSE")
      .map((b) => ({ ...b, vehicule: v }))
  );
}

export function getInterventionsDuGarage(garageId: string) {
  return interventions
    .filter((i) => i.garageId === garageId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getClientsDuGarage(garageId: string) {
  const vehiculesGarage = getVehiculesAccessiblesParGarage(garageId);
  const proprietaireIds = Array.from(new Set(vehiculesGarage.map((v) => v.proprietaireId)));
  return proprietaireIds.map((id) => {
    const u = utilisateurs.find((u) => u.id === id)!;
    const vehiculesDuClient = vehiculesGarage.filter((v) => v.proprietaireId === id);
    return { utilisateur: u, vehicules: vehiculesDuClient };
  });
}
