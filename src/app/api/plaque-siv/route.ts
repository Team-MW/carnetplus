import { NextRequest, NextResponse } from "next/server";
import { getVehiculeInfoParImmatriculation } from "@/lib/services/plaque-siv";

export async function GET(request: NextRequest) {
  const immatriculation = request.nextUrl.searchParams.get("immatriculation");

  if (!immatriculation?.trim()) {
    return NextResponse.json({ error: "Paramètre immatriculation requis" }, { status: 400 });
  }

  try {
    const result = await getVehiculeInfoParImmatriculation(immatriculation);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    const status = message.includes("manquante") ? 500 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
