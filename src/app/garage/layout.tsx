import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { navGarage } from "@/components/layout/nav-config";
import { getUtilisateurCourant } from "@/lib/data/repository";

export default function GarageLayout({ children }: { children: React.ReactNode }) {
  const utilisateur = getUtilisateurCourant("GARAGE");

  return (
    <div className="flex min-h-screen">
      <Sidebar
        items={navGarage}
        espaceLabel="Espace professionnel"
        switchHref="/particulier/dashboard"
        switchLabel="Passer en espace particulier"
      />
      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar title="Carnet+ Pro" utilisateurNom={utilisateur.nom} items={navGarage} />
        <main className="flex-1 bg-background p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
