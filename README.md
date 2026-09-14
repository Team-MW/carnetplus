# Carnet+ Web — MVP

Version web complète de Carnet+, construite à partir du dossier de
spécifications fonctionnelles (Kardex multi-garage, preuve photo
anti-fraude, zéro double saisie, devis automatique par garage titulaire).

## Installation

Ce projet a été écrit intégralement en dehors d'un environnement disposant
d'accès réseau : les dépendances n'ont donc **pas pu être installées ni le
build vérifié** avant livraison. Première étape obligatoire :

```bash
npm install
npm run dev
```

Ouvrez `http://localhost:3000`. La page d'accueil propose les deux espaces
(particulier / garage) — tout fonctionne sur le jeu de données de
démonstration (`src/lib/mock-data.ts`), sans base de données requise.

## Ce qui est fonctionnel dans cette version

**Espace particulier** (7 écrans) : Dashboard, Mes véhicules, Kardex global,
fiche véhicule complète (avec drawer de partage d'accès QR code + révocation
fonctionnelle), Garages, Documents, Autorisations, Profil.

**Espace garage** (8 écrans) : Dashboard (devis à préparer par garage
titulaire), Véhicules, Interventions (avec flux de dépôt de facture → OCR
simulé → correction obligatoire de la ligne ambiguë → validation →
ventilation), Devis (génération, drawer de détail, validation manuelle
obligatoire avant tout envoi), Factures, Dossiers travaux (galerie photo
4 temps avec hash et horodatage affichés), Clients, Réglages (taux horaire
éditable).

**Règles métier codées en logique pure** (`src/lib/business-rules.ts`),
indépendantes de l'UI et donc testables unitairement :
- Double butée calendaire/km, jamais de moyenne entre les deux
- Garage titulaire = dernier garage à avoir enregistré une intervention
- Devis toujours en statut BROUILLON tant que non validé par le garagiste
- Permissions d'accès garage strictement conditionnées à une autorisation active

## Ce qui est mocké (à brancher plus tard)

Tous les services externes non encore disponibles sont dans
`src/lib/mock-services/` avec une latence simulée réaliste :
- `vin-decode.ts` — décodage VIN
- `autodata.ts` — référentiel constructeur (intervalles, barèmes de temps)
- `ocr-facture.ts` — extraction de facture
- `fva-controle-technique.ts` — vérification assurance et contrôle technique

Chaque fichier documente en commentaire ce qu'il faudra remplacer par un
vrai appel API.

## Ce qui reste à faire pour une V1 déployable

- Authentification réelle (actuellement : utilisateur de démo fixe via
  `getUtilisateurCourant()` dans `src/lib/data/repository.ts`)
- Rôles et permissions au niveau des routes (middleware Next.js)
- Branchement de `prisma/schema.prisma` sur une vraie base PostgreSQL
  (le schéma et le seed sont prêts, il suffit de renseigner `DATABASE_URL`
  et de lancer `npx prisma migrate dev && npm run db:seed`)
- Upload réel des photos du dossier travaux (capture native obligatoire,
  calcul du hash SHA-256 et horodatage côté serveur — actuellement simulés
  dans les données de démo)
- Intégration FVA réelle (accès public ouvert depuis le 13/02/2026,
  modalités d'accès API à confirmer)
- Vérification de build (`npm run build`) et correction des éventuelles
  erreurs TypeScript une fois les dépendances installées

## Stack

Next.js (App Router) · React · TypeScript · Tailwind CSS · Prisma ·
PostgreSQL (schéma prêt, non connecté dans cette version).
# carnetplus
