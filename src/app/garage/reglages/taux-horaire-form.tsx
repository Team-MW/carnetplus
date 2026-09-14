"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export function TauxHoraireForm({ tauxInitial }: { tauxInitial: number }) {
  const [taux, setTaux] = useState(tauxInitial);
  const [enregistre, setEnregistre] = useState(false);

  return (
    <div className="flex items-end gap-3">
      <div>
        <label className="mb-1 block text-xs text-muted-foreground" htmlFor="taux">
          Taux horaire HT (€)
        </label>
        <input
          id="taux"
          type="number"
          value={taux}
          onChange={(e) => {
            setTaux(Number(e.target.value));
            setEnregistre(false);
          }}
          className="w-32 rounded-md border border-border px-3 py-2 text-sm outline-none focus:border-primary-400"
        />
      </div>
      <Button variant="primary" onClick={() => setEnregistre(true)}>
        Enregistrer
      </Button>
      {enregistre && (
        <span className="flex items-center gap-1 text-sm text-primary-600">
          <CheckCircle2 size={15} /> Enregistré
        </span>
      )}
    </div>
  );
}
