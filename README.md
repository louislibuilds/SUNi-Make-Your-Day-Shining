# SUNi — Make Your Day Shining

Full-stack lifestyle e-commerce (MERN + TypeScript). Side project by [LouisLi1020](https://github.com/LouisLi1020).

**Repository:** https://github.com/LouisLi1020/SUNi-Make-Your-Day-Shining

[![CI](https://github.com/LouisLi1020/SUNi-Make-Your-Day-Shining/actions/workflows/ci.yml/badge.svg)](https://github.com/LouisLi1020/SUNi-Make-Your-Day-Shining/actions/workflows/ci.yml)

---

## What works today

| Area | Status | Notes |
|------|--------|--------|
| Backend API | ✅ | Auth, products, cart, checkout routes (MongoDB) |
| Frontend UI | 🚧 | Figma-based pages; some flows still on mock data |
| AWS deploy | ⏸ | Previously targeted; **no live server** (university credits ended) |
| CI / tests | ✅ | GitHub Actions — server tests + client build |

> Add screenshots under `docs/assets/screenshots/` and embed here when captured locally.

---

## Quick start (local)

**Prerequisites:** Node 18+, MongoDB (or `docker-compose up -d`)

```bash
git clone https://github.com/LouisLi1020/SUNi-Make-Your-Day-Shining.git
cd SUNi-Make-Your-Day-Shining

# Backend
cd server && cp env.example .env && npm install && npm run dev

# Frontend (new terminal)
cd client && npm install && npm run dev
```

- API: http://localhost:5000 — health: `/health`  
- See [docs/DEVELOPMENT_SETUP.md](docs/DEVELOPMENT_SETUP.md) for details.

---

## Architecture

```mermaid
flowchart LR
  React[React client] --> Express[Express API]
  Express --> MongoDB[(MongoDB)]
```

Full diagram: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) · Deployment: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

---

## Tech stack

- **Client:** React 18, TypeScript, Vite, Tailwind, Zustand  
- **Server:** Node, Express, Mongoose, JWT, Stripe (configured via env)  
- **Ops:** Docker Compose (dev), GitHub Actions (CI)

---

## 43030 Professional Learning (UTS)

Evidence for Assessment Task 1 / 3 (ChengYi Li, 25526411):

| Goal | Evidence in this repo |
|------|---------------------|
| G2 Cybersecurity | [docs/security/sunishop-security.md](docs/security/sunishop-security.md) |
| G3 Software tools | [.github/workflows/ci.yml](.github/workflows/ci.yml), `server/src/__tests__/` |
| G4 System design | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |

Full index: [docs/43030-PORTFOLIO.md](docs/43030-PORTFOLIO.md)

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Use branches such as `43030/g2-security` for subject-related work.

## License

MIT
