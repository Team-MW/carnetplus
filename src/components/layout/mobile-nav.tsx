"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import type { NavItem } from "./nav-config";
import { navIcons } from "./nav-icons";

export function MobileNav({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
}) {
  const pathname = usePathname();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute left-0 top-0 h-full w-72 bg-card p-4 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-medium">Carnet+</p>
          <button onClick={onClose} aria-label="Fermer" className="rounded-md p-1 hover:bg-muted">
            <X size={18} />
          </button>
        </div>
        <nav className="space-y-0.5">
          {items.map((item) => {
            const active = pathname?.startsWith(item.href);
            const Icon = navIcons[item.icon];
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm",
                  active ? "bg-primary-50 font-medium text-primary-800" : "hover:bg-muted"
                )}
              >
                <Icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
