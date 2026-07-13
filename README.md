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

**[Highlights](#-highlights)** · **[Quick start](#-quick-start)** · **[Status](#-status)**

</div>

---

## ✨ Highlights

| | |
|---|---|
| 🛍️ **Curated storefront** | Calm catalog with categories, filtering, and product views. |
| 🔐 **Typed API** | Express + Mongoose with JWT auth for users, catalog, cart, and checkout. |
| 💳 **Checkout ready** | Stripe payment flow wired into the order pipeline. |
| 🔄 **Offline-friendly UI** | Calls the live API when reachable; falls back to mock catalog otherwise. |
| ✅ **CI on every push** | GitHub Actions — server tests + client build. |

## 🚀 Quick start

**Prerequisites:** Node.js 20+, MongoDB (optional: `docker compose up -d`)

```bash
git clone https://github.com/louislibuilds/SUNi-Make-Your-Day-Shining.git
cd SUNi-Make-Your-Day-Shining

docker compose up -d          # optional — local MongoDB
cd server && cp env.example .env && npm install && npm run dev

cd client && npm install && npm run dev   # new terminal
```

| Service | URL |
|---------|-----|
| 🛒 Storefront | http://localhost:3000 |
| 🔌 API | http://localhost:5000 |
| ❤️ Health | http://localhost:5000/health |

> The storefront runs without a backend — mock catalog data is served when the API is offline.

## 🧱 Stack

**Frontend** — React 18 · TypeScript · Vite · Tailwind · Zustand  
**Backend** — Express · Mongoose · MongoDB · JWT · Stripe

```text
client/     React storefront (Vite)
server/     Express API
```

## 🧭 Status

Personal side project — under active development.

- ✅ Backend routes for auth, catalog, cart, and checkout
- ✅ Storefront UI with API-first data and mock fallback
- 🚧 Full frontend ↔ API integration across all pages
- 🚧 Admin CMS for product management
- 🔜 Staging deployment

**Demo:** _coming soon_

## 📄 License

[MIT](LICENSE) © Louis Li
