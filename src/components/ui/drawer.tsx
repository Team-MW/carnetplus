"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export function Drawer({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div
        className={cn(
          "relative h-full w-full max-w-md overflow-y-auto bg-card p-6 shadow-xl",
          "animate-in slide-in-from-right"
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium">{title}</h2>
          <button onClick={onClose} aria-label="Fermer" className="rounded-md p-1 hover:bg-muted">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
