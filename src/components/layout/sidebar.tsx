"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavItem } from "./nav-config";
import { navIcons } from "./nav-icons";
import { NotebookText, ArrowLeftRight } from "lucide-react";

export function Sidebar({
  items,
  espaceLabel,
  switchHref,
  switchLabel,
}: {
  items: NavItem[];
  espaceLabel: string;
  switchHref: string;
  switchLabel: string;
}) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card lg:flex">
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-600 text-white">
          <NotebookText size={18} />
        </div>
        <div>
          <p className="text-sm font-medium leading-none">Carnet+</p>
          <p className="text-xs text-muted-foreground">{espaceLabel}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 px-3">
        {items.map((item) => {
          const active = pathname?.startsWith(item.href);
          const Icon = navIcons[item.icon];
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-primary-50 font-medium text-primary-800"
                  : "text-foreground/80 hover:bg-muted"
              )}
            >
              <Icon size={17} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <Link
          href={switchHref}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted"
        >
          <ArrowLeftRight size={16} />
          {switchLabel}
        </Link>
      </div>
    </aside>
  );
}
