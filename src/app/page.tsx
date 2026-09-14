import Link from "next/link";
import { NotebookText } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-primary-50 px-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-600 text-white">
          <NotebookText size={22} />
        </div>
        <p className="text-2xl font-medium text-primary-900">Carnet+</p>
      </div>
      <p className="max-w-md text-center text-muted-foreground">
        Le carnet numérique universel du véhicule — transportable, consultable
        partout, par tous.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/particulier/dashboard"
          className="rounded-md bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800"
        >
          Espace particulier
        </Link>
        <Link
          href="/garage/dashboard"
          className="rounded-md border border-primary-200 bg-white px-5 py-2.5 text-center text-sm font-medium text-primary-800 hover:bg-primary-50"
        >
          Espace garage professionnel
        </Link>
      </div>
    </main>
  );
}
