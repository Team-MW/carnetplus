// Seed Prisma — à activer une fois DATABASE_URL renseignée et
// `npx prisma migrate dev` exécuté. Reprend le même jeu de données que
// src/lib/mock-data.ts pour que la démo reste identique en base réelle.

import { PrismaClient } from "@prisma/client";
import {
  utilisateurs,
  garages,
  vehicules,
  butees,
  interventions,
  autorisationsAcces,
  devisList,
} from "../src/lib/mock-data";

const prisma = new PrismaClient();

async function main() {
  for (const u of utilisateurs) {
    await prisma.utilisateur.upsert({
      where: { id: u.id },
      update: {},
      create: { id: u.id, email: u.email, nom: u.nom, role: u.role },
    });
  }

  for (const g of garages) {
    await prisma.garage.upsert({
      where: { id: g.id },
      update: {},
      create: {
        id: g.id,
        utilisateurId: g.utilisateurId,
        nom: g.nom,
        siret: g.siret,
        tauxHoraireHT: g.tauxHoraireHT,
        badgeVerifie: g.badgeVerifie,
      },
    });
  }

  for (const v of vehicules) {
    await prisma.vehicule.upsert({
      where: { id: v.id },
      update: {},
      create: {
        id: v.id,
        vin: v.vin,
        immatriculation: v.immatriculation,
        numeroFormule: v.numeroFormule,
        marque: v.marque,
        modele: v.modele,
        motorisation: v.motorisation,
        dateMiseCirculation: v.dateMiseCirculation ? new Date(v.dateMiseCirculation) : undefined,
        kilometrageCourant: v.kilometrageCourant,
        typeVehicule: v.typeVehicule,
        proprietaireId: v.proprietaireId,
        garageTitulaireId: v.garageTitulaireId,
        statutAssuranceFva: v.statutAssuranceFva,
        dateProchainCT: v.dateProchainCT ? new Date(v.dateProchainCT) : undefined,
      },
    });
  }

  for (const b of butees) {
    await prisma.buteeEntretien.upsert({
      where: { id: b.id },
      update: {},
      create: {
        id: b.id,
        vehiculeId: b.vehiculeId,
        typeIntervention: b.typeIntervention,
        dateDerniereIntervention: new Date(b.dateDerniereIntervention),
        kmDerniereIntervention: b.kmDerniereIntervention,
        intervalleMoisDefaut: b.intervalleMoisDefaut,
        intervalleKmDefaut: b.intervalleKmDefaut,
        sourceIntervalle: b.sourceIntervalle,
      },
    });
  }

  for (const i of interventions) {
    await prisma.intervention.upsert({
      where: { id: i.id },
      update: {},
      create: {
        id: i.id,
        vehiculeId: i.vehiculeId,
        garageId: i.garageId,
        date: new Date(i.date),
        kilometrage: i.kilometrage,
        typeIntervention: i.typeIntervention,
        factureSourceUrl: i.factureSourceUrl,
        lignesFacture: {
          create: i.lignesFacture.map((l) => ({
            libelle: l.libelle,
            montantHT: l.montantHT,
            statut: l.statut,
          })),
        },
        ...(i.dossierTravaux && {
          dossierTravaux: {
            create: {
              photoEtiquetteUrl: i.dossierTravaux.photoEtiquetteUrl,
              photoPieceNeuveUrl: i.dossierTravaux.photoPieceNeuveUrl,
              photoPieceInstalleeUrl: i.dossierTravaux.photoPieceInstalleeUrl,
              photoPieceUsageeUrl: i.dossierTravaux.photoPieceUsageeUrl,
              geoLat: i.dossierTravaux.geoLat,
              geoLng: i.dossierTravaux.geoLng,
              hashEtiquette: i.dossierTravaux.hashEtiquette,
              hashPieceNeuve: i.dossierTravaux.hashPieceNeuve,
              hashPieceInstallee: i.dossierTravaux.hashPieceInstallee,
              hashPieceUsagee: i.dossierTravaux.hashPieceUsagee,
              commentaireIa: i.dossierTravaux.commentaireIa,
            },
          },
        }),
      },
    });
  }

  for (const a of autorisationsAcces) {
    await prisma.autorisationAcces.upsert({
      where: { id: a.id },
      update: {},
      create: {
        id: a.id,
        vehiculeId: a.vehiculeId,
        garageId: a.garageId,
        type: a.type,
        dateOctroi: new Date(a.dateOctroi),
        dateRevocation: a.dateRevocation ? new Date(a.dateRevocation) : undefined,
        octroyeeParId: a.octroyeeParId,
      },
    });
  }

  for (const d of devisList) {
    await prisma.devis.upsert({
      where: { id: d.id },
      update: {},
      create: {
        id: d.id,
        vehiculeId: d.vehiculeId,
        garageId: d.garageId,
        buteeDeclenchanteType: d.buteeDeclenchanteType,
        lignes: d.lignes as any,
        totalHT: d.totalHT,
        totalTTC: d.totalTTC,
        statut: d.statut,
        dateEnvoi: d.dateEnvoi ? new Date(d.dateEnvoi) : undefined,
      },
    });
  }

  console.log("Seed terminé.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
