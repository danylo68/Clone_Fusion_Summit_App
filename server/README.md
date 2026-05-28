# Fusion Summit Capital Markets — Backend NestJS

API REST modulaire en **NestJS + TypeScript + PostgreSQL (TypeORM)**.

## Architecture

```
server/src/
├── main.ts                          ← Bootstrap NestJS
├── app.module.ts                    ← Module racine — importe tous les modules
├── common/
│   ├── filters/
│   │   └── http-exception.filter.ts ← Gestion erreurs globale
│   └── interceptors/
│       └── response.interceptor.ts  ← Enveloppe { success, data }
├── database/
│   ├── schema.sql                   ← Schéma PostgreSQL complet
│   └── seeds/
│       └── run-seed.ts              ← Génère ~2000 trades
└── modules/
    ├── trades/          trade.entity · trades.service · trades.controller · trades.module · dto/
    ├── bonds/           bond.entity  · bonds.service  · bonds.controller  · bonds.module  · dto/
    ├── counterparties/  counterparty.entity · legal-entity.entity · trader.entity · ...service · ...controller · ...module · dto/
    ├── trade-tasks/     trade-task.entity · ...service · ...controller · ...module · dto/
    ├── repos/           repo.entity        · ...service · ...controller · ...module
    ├── cds/             cds.entity         · ...service · ...controller · ...module
    ├── derivatives/     derivative.entity  · ...service · ...controller · ...module
    ├── fx-spot/         fx-spot.entity     · ...service · ...controller · ...module
    ├── fx-swap/         fx-swap.entity     · ...service · ...controller · ...module
    ├── valuations/      valuation.entity   · ...service · ...controller · ...module · dto/
    ├── market-data/     market-data.entity · ...service · ...controller · ...module
    └── static-data/                          ...service · ...controller · ...module
```

## Installation

```bash
# 1. PostgreSQL — créer la base et appliquer le schéma
createdb fusion_summit
psql fusion_summit < src/database/schema.sql

# 2. Variables d'environnement
cp .env.template .env
# Éditer .env avec tes credentials PostgreSQL

# 3. Dépendances
npm install

# 4. Seed (~2000 trades)
npm run seed

# 5. Démarrage
npm run start:dev
```

## Endpoints API

Swagger disponible sur `http://localhost:3000/api/docs`

| Méthode | URL | Description |
|---------|-----|-------------|
| GET | /api/trades | Blotter — filtres + pagination |
| GET | /api/trades/stats | Statistiques globales |
| GET | /api/trades/:id | Détail d'un trade |
| GET | /api/bonds | Liste des obligations |
| GET | /api/bonds/isin/:isin | Par ISIN |
| GET | /api/counterparties | Contreparties |
| GET | /api/counterparties/traders | Traders |
| GET | /api/counterparties/legal-entities | Entités légales |
| GET | /api/trade-tasks | File back/middle office |
| GET | /api/trade-tasks/dashboard | Stats dashboard |
| PATCH | /api/trade-tasks/:id/status | Mise à jour statut |
| GET | /api/repos | Repo trades |
| GET | /api/cds | CDS trades |
| GET | /api/derivatives | IRS & CCS |
| GET | /api/fx-spot | FX Spot |
| GET | /api/fx-swap | FX Swap |
| GET | /api/valuations | Valorisations du jour |
| GET | /api/valuations/portfolio | MTM + P&L total |
| GET | /api/market-data/fx-rates | Taux FX |
| GET | /api/market-data/rates | Taux d'intérêt |
| GET | /api/market-data/credit-spreads | Spreads crédit |
| GET | /api/static-data/trade-types | Types de trades |

## Stack

- **NestJS 10** + **TypeScript 5**
- **TypeORM 0.3** + **PostgreSQL 15**
- **Swagger** (`@nestjs/swagger`)
- **class-validator** + **class-transformer**
