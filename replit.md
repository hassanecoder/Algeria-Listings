# Workspace

## Overview

pnpm workspace monorepo using TypeScript. ImmoAlgérie — a full-featured real estate listings platform for Algeria.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite + TanStack Query + Wouter + Tailwind CSS + shadcn/ui + Framer Motion

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express API server
│   └── immo-dz/            # React + Vite frontend (main app at /)
├── lib/
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/
│   └── src/seed.ts         # Database seed script
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Application: ImmoAlgérie

Real estate listings platform for Algeria with:

### Pages
- **/** — Home with hero search, featured properties, wilayas grid, stats banner
- **/properties** — Full listings with filter sidebar (type/category/wilaya/price/area/rooms)
- **/properties/:id** — Property detail page with gallery, agent card, contact form
- **/wilayas** — 12 Algerian wilayas with descriptions, avg prices, property counts
- **/agents** — 8 verified real estate agents directory
- **/contact** — Contact form + office info
- **/about** — About page

### Database Schema
- **agents** table — 8 real estate agents (Algiers, Oran, Constantine, Annaba, Tizi Ouzou, Sétif, Blida, Batna)
- **properties** table — 30 Algerian property listings (apartments, villas, houses, studios, land, commercial, offices)
- **inquiries** table — Contact inquiries from users

### API Endpoints
- `GET /api/healthz` — Health check
- `GET /api/properties` — List with filters (type, category, wilaya, price, area, rooms, featured, search)
- `GET /api/properties/featured` — Featured properties
- `GET /api/properties/:id` — Single property with agent
- `GET /api/agents` — All agents
- `GET /api/agents/:id` — Single agent
- `GET /api/wilayas` — 12 wilayas with real property counts
- `POST /api/inquiries` — Submit inquiry
- `GET /api/stats` — Market statistics

### Seeding
Run: `pnpm --filter @workspace/scripts run seed`

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references.

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes in `src/routes/`. Data in `src/data/wilayas.ts`.

### `artifacts/immo-dz` (`@workspace/immo-dz`)

React + Vite frontend at preview path `/`. Built with shadcn/ui, Framer Motion, react-hook-form.

### `lib/db` (`@workspace/db`)

Drizzle ORM schema with agents, properties, inquiries tables + relations.
Run `pnpm --filter @workspace/db run push` for schema migrations.
