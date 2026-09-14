import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { navParticulier } from "@/components/layout/nav-config";
import { getUtilisateurCourant } from "@/lib/data/repository";

export default function ParticulierLayout({ children }: { children: React.ReactNode }) {
  const utilisateur = getUtilisateurCourant("PARTICULIER");

  return (
    <div className="flex min-h-screen">
      <Sidebar
        items={navParticulier}
        espaceLabel="Espace particulier"
        switchHref="/garage/dashboard"
        switchLabel="Passer en espace garage"
      />
      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar title="Carnet+" utilisateurNom={utilisateur.nom} items={navParticulier} />
        <main className="flex-1 bg-background p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
