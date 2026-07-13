<div align="center">

# ☀️ SUNi — Make everyday shining

A calm, curated lifestyle storefront — built on the MERN stack with a clean React UI and a typed Express API for auth, catalog, cart, and checkout.

<br/>

[![CI](https://github.com/louislibuilds/SUNi-Make-Your-Day-Shining/actions/workflows/ci.yml/badge.svg)](https://github.com/louislibuilds/SUNi-Make-Your-Day-Shining/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-2d5a62.svg)](LICENSE)
![Status](https://img.shields.io/badge/status-in%20development-c9a962.svg)

![React](https://img.shields.io/badge/React-18-20232a?logo=react&logoColor=61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646cff?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-06b6d4?logo=tailwindcss&logoColor=white)
![Node](https://img.shields.io/badge/Node-20+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47a248?logo=mongodb&logoColor=white)

**[Quick start](#-quick-start)** · **[Documentation](#-documentation)** · **[Roadmap](#-status--roadmap)**

</div>

<!-- Drop a hero screenshot at docs/assets/screenshots/home.png and uncomment:
<p align="center"><img src="docs/assets/screenshots/home.png" alt="SUNi storefront" width="820"/></p>
-->

---

## ✨ Highlights

| | |
|---|---|
| 🛍️ **Curated storefront** | Calm, uncluttered catalog with categories, filtering, and product detail views. |
| 🔐 **Typed API** | Express + Mongoose with JWT auth for users, catalog, cart, and checkout. |
| 💳 **Checkout ready** | Stripe payment flow wired into the order pipeline. |
| 🔄 **Offline-friendly UI** | Frontend calls the live API when reachable, and falls back to local mock data otherwise. |
| ✅ **CI on every push** | GitHub Actions runs build and tests to keep `main` green. |

## 🚀 Quick start

**Prerequisites:** Node.js 20+ and MongoDB ([Docker optional](docs/development.md)).

```bash
git clone https://github.com/louislibuilds/SUNi-Make-Your-Day-Shining.git
cd SUNi-Make-Your-Day-Shining

docker compose up -d                                  # optional — local MongoDB
cd server && cp env.example .env && npm install && npm run dev

cd client && npm install && npm run dev               # in a new terminal
```

| Service | URL |
|---------|-----|
| 🛒 Storefront | http://localhost:3000 |
| 🔌 API | http://localhost:5000 |
| ❤️ Health check | http://localhost:5000/health |

> The storefront runs without a backend — it automatically serves mock catalog data when the API is offline.

Full walkthrough: **[docs/development.md](docs/development.md)**

## 📚 Documentation

| Guide | What's inside |
|-------|---------------|
| [Development](docs/development.md) | Local environment, env vars, seed data |
| [Deployment](docs/deployment.md) | MongoDB Atlas · Railway · Vercel |
| [Architecture](docs/architecture.md) | System design and repo layout |
| [Contributing](docs/contributing.md) | Branches, commits, and PRs |

## 🧱 Tech stack

**Frontend** — React 18 · TypeScript · Vite · Tailwind · Zustand
**Backend** — Express · Mongoose · MongoDB · JWT · Stripe

## 🗂️ Project layout

```text
client/     React storefront (Vite)
server/     Express API
docs/       Contributor documentation
```

## 🧭 Status & roadmap

SUNi is under active development.

- ✅ Backend routes for auth, catalog, cart, and checkout
- ✅ Storefront UI with API-first data and mock fallback
- 🚧 Full frontend ↔ API integration across all pages
- 🚧 Admin CMS for product management (create / edit / stock)
- 🔜 Staging deployment (Atlas + Railway + Vercel)

## 📄 License

[MIT](LICENSE) © Louis Li
