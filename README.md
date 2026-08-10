# AMAS

Site de l'association motocycliste **AMAS** : présentation du club, agenda des sorties et événements, inscriptions en ligne des membres, et back-office complet pour gérer le contenu.

---

## Fonctionnalités

### Espace public

| Page | Contenu |
|---|---|
| Accueil | Présentation de l'association |
| Agenda | Sorties et événements à venir, avec inscription en ligne |
| Sorties | Comptes rendus des sorties passées |
| Réalisations | Articles sur les projets du club |
| Motos | Galerie des motos des membres |
| Histoire | Historique de l'association |
| Contact | Formulaire de contact |

### Back-office (`/admin`)

Accès protégé par authentification. Permet de gérer :

- **Agenda** — créer, modifier et supprimer les événements ; consulter la liste des inscrits
- **Articles** — rédiger des comptes rendus de sorties et des réalisations, avec images et vidéos
- **Membres** — gérer les adhérents du club
- **Bureau** — gérer les membres du bureau et leurs rôles (président, vice-président, trésorier, technique, secrétaire, communication)
- **Motos** — alimenter la galerie

Les événements peuvent cibler une audience : tout le monde, les adhérents uniquement, ou les visiteurs.

---

## Stack technique

| Couche | Technologie |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Langage | TypeScript |
| Styles | Tailwind CSS 4 |
| ORM | Prisma 7 (adapter `@prisma/adapter-pg`) |
| Base de données | PostgreSQL (Supabase) |
| Authentification | NextAuth v5 + bcryptjs |
| Stockage fichiers | Cloudflare R2 (via le SDK S3) |
| Emails | Resend |
| Icônes | Lucide React |
| Déploiement | Vercel |

---

## Prérequis

- Node.js 20+
- Une base PostgreSQL accessible
- Un bucket Cloudflare R2
- Un compte Resend (envoi d'emails)

---

## Installation

```bash
# 1. Installer les dépendances (déclenche prisma generate)
npm install

# 2. Créer le fichier d'environnement
cp .env.example .env
# puis renseigner les valeurs (voir la section suivante)

# 3. Appliquer le schéma à la base
npx prisma migrate deploy

# 4. Lancer le serveur de développement
npm run dev
```

L'application est accessible sur **http://localhost:3000**.

---

## Variables d'environnement

| Variable | Obligatoire | Description |
|---|---|---|
| `DATABASE_URL` | Oui | Connexion PostgreSQL (URL poolée) |
| `DIRECT_URL` | Oui | Connexion directe, utilisée par Prisma pour les migrations |
| `NEXTAUTH_SECRET` | Oui | Secret de signature des sessions NextAuth |
| `AUTH_SECRET` | Oui | Secret NextAuth v5 |
| `R2_ACCOUNT_ID` | Oui | Identifiant du compte Cloudflare |
| `R2_ACCESS_KEY_ID` | Oui | Clé d'accès R2 |
| `R2_SECRET_ACCESS_KEY` | Oui | Clé secrète R2 |
| `R2_BUCKET_NAME` | Oui | Nom du bucket |
| `NEXT_PUBLIC_R2_PUBLIC_URL` | Oui | URL publique du bucket (exposée au client) |
| `CRON_SECRET` | Oui | Jeton protégeant la route de nettoyage planifiée |

> Ne jamais committer le fichier `.env` : il est ignoré par git.

---

## Modèle de données

| Modèle | Rôle |
|---|---|
| `Admin` | Comptes du back-office |
| `Member` | Membres du bureau et leurs rôles |
| `MemberClub` | Adhérents du club |
| `Event` | Sorties et événements de l'agenda |
| `Registration` | Inscriptions à un événement |
| `Article` | Comptes rendus (`sortie`) et réalisations (`realisation`) |
| `ArticleImage` / `ArticleVideo` | Médias rattachés à un article |
| `Moto` / `MotoImage` | Galerie des motos |

---

## Routes API

| Route | Rôle |
|---|---|
| `/api/auth/[...nextauth]` | Authentification NextAuth |
| `/api/upload` | Upload de fichiers vers Cloudflare R2 |
| `/api/events/[id]/register` | Inscription à un événement |
| `/api/cron/cleanup-r2` | Suppression des fichiers orphelins du bucket (tâche planifiée, protégée par `CRON_SECRET`) |

---

## Structure du projet

```text
AMAS/
├── prisma/
│   ├── schema.prisma       # Modèles de données
│   └── seed.ts             # Données initiales
├── src/
│   ├── app/
│   │   ├── (public)/       # Pages publiques
│   │   ├── admin/          # Back-office
│   │   ├── api/            # Routes API
│   │   └── action/         # Server actions
│   ├── components/
│   │   ├── layout/
│   │   └── shared/
│   ├── lib/
│   │   ├── db.ts           # Client Prisma
│   │   └── r2.ts           # Client Cloudflare R2
│   └── types/
└── next.config.ts
```

---

## Scripts

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | `prisma generate` puis build de production |
| `npm run start` | Serveur de production |
| `npm run lint` | ESLint |
