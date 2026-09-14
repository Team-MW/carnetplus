"use client";

import { Search, Bell, Menu } from "lucide-react";
import { useState } from "react";
import { MobileNav } from "./mobile-nav";
import type { NavItem } from "./nav-config";

export function Topbar({
  title,
  utilisateurNom,
  items,
}: {
  title: string;
  utilisateurNom: string;
  items: NavItem[];
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="flex items-center justify-between gap-4 border-b border-border bg-card px-4 py-3 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          className="rounded-md p-2 hover:bg-muted lg:hidden"
          aria-label="Ouvrir la navigation"
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-medium">{title}</h1>
      </div>

      <div className="hidden max-w-sm flex-1 items-center gap-2 rounded-md border border-border px-3 py-1.5 md:flex">
        <Search size={15} className="text-muted-foreground" />
        <input
          placeholder="Rechercher un véhicule, une immatriculation…"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="flex items-center gap-3">
        <button aria-label="Notifications" className="relative rounded-md p-2 hover:bg-muted">
          <Bell size={18} />
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-50 text-sm font-medium text-primary-800">
          {utilisateurNom.charAt(0)}
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} items={items} />
    </header>
  );
}
