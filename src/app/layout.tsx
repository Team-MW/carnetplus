import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carnet+ — Le carnet numérique universel du véhicule",
  description: "Kardex multi-garage, preuve photo anti-fraude, zéro double saisie.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
