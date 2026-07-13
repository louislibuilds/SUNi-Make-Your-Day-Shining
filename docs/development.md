# Development

## Prerequisites

- **Node.js 20+** (matches CI)
- **Git**
- **MongoDB** — local install, [Docker](#mongodb), or Atlas dev cluster

Optional: MongoDB Compass, Stripe CLI (checkout testing).

## Quick start

```bash
git clone https://github.com/louislibuilds/SUNi-Make-Your-Day-Shining.git
cd SUNi-Make-Your-Day-Shining

# Install dependencies
npm run install:all

# Start MongoDB (pick one)
docker compose up -d

# API
cd server
cp env.example .env
npm run dev

# Client — new terminal
cd client
npm run dev
```

## URLs

| Service | URL |
|---------|-----|
| Storefront | http://localhost:3000 |
| API | http://localhost:5000 |
| Health | http://localhost:5000/health |

## Environment

### Server (`server/.env`)

Copy from `server/env.example`. Minimum for local:

```env
MONGODB_URI=mongodb://localhost:27017/suni-dev
JWT_SECRET=local-dev-secret-at-least-32-chars
CLIENT_URL=http://localhost:3000
PORT=5000
NODE_ENV=development
```

`CLIENT_URL` must match the Vite dev server origin (CORS).

### Client

Create `client/.env.local` (not committed):

```env
VITE_API_URL=http://localhost:5000
```

## MongoDB

**Docker (recommended for local):**

```bash
docker compose up -d
```

This starts MongoDB on port `27017` with no auth — matches the default `MONGODB_URI` above.

**Without Docker:** install MongoDB locally or use a free Atlas cluster and set `MONGODB_URI` in `server/.env`.

## Seed data

```bash
cd server
npm run seed
```

## Commands

```bash
# From repo root
npm run install:all
npm run dev              # API only
npm run dev:client
npm run build:client
npm test                 # server tests

# Server
cd server && npm run type-check && npm test

# Client
cd client && npm run build
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| CORS error in browser | Set `CLIENT_URL=http://localhost:3000` on the server |
| `ECONNREFUSED` to MongoDB | Run `docker compose up -d` or fix `MONGODB_URI` |
| Empty product list | Run `npm run seed` in `server/` |
| Client `tsc` fails | Run `npm install` in `client/` (needs `typescript` in devDependencies) |

## CI

GitHub Actions runs server tests + client build on push/PR to `main`. See [`.github/workflows/ci.yml`](../.github/workflows/ci.yml).
