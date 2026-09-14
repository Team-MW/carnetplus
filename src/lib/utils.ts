import clsx, { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatKm(km: number): string {
  return `${km.toLocaleString("fr-FR")} km`;
}

export function formatEuro(montant: number): string {
  return montant.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}
