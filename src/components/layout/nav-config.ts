export type NavIconName =
  | "LayoutDashboard"
  | "Car"
  | "BookOpen"
  | "Building2"
  | "FileText"
  | "ShieldCheck"
  | "User"
  | "Wrench"
  | "ClipboardList"
  | "Receipt"
  | "Camera"
  | "Users"
  | "Settings";

export interface NavItem {
  label: string;
  href: string;
  icon: NavIconName;
}

export const navParticulier: NavItem[] = [
  { label: "Dashboard", href: "/particulier/dashboard", icon: "LayoutDashboard" },
  { label: "Mes véhicules", href: "/particulier/vehicules", icon: "Car" },
  { label: "Kardex", href: "/particulier/kardex", icon: "BookOpen" },
  { label: "Garages", href: "/particulier/garages", icon: "Building2" },
  { label: "Documents", href: "/particulier/documents", icon: "FileText" },
  { label: "Autorisations", href: "/particulier/autorisations", icon: "ShieldCheck" },
  { label: "Profil", href: "/particulier/profil", icon: "User" },
];

export const navGarage: NavItem[] = [
  { label: "Dashboard", href: "/garage/dashboard", icon: "LayoutDashboard" },
  { label: "Véhicules", href: "/garage/vehicules", icon: "Car" },
  { label: "Interventions", href: "/garage/interventions", icon: "Wrench" },
  { label: "Devis", href: "/garage/devis", icon: "ClipboardList" },
  { label: "Factures", href: "/garage/factures", icon: "Receipt" },
  { label: "Dossiers travaux", href: "/garage/dossiers-travaux", icon: "Camera" },
  { label: "Clients", href: "/garage/clients", icon: "Users" },
  { label: "Réglages", href: "/garage/reglages", icon: "Settings" },
];
