# Deployment notes

## Historical (AWS)

SUNi Shop was designed for MERN deployment on **AWS** (application server + MongoDB). University-provided cloud credits have been used; **no live instance is running** at the time of the 43030 report.

Architecture (conceptual):

- Client: static build (Vite/React) — CDN or S3 + CloudFront
- API: Node/Express on EC2 or container
- Data: MongoDB (Atlas or self-hosted)

## Local development (current evidence path)

```bash
# MongoDB via Docker
docker-compose up -d

cd server && cp env.example .env
npm install && npm run dev

cd client && npm install && npm run dev
```

- API: http://localhost:5000  
- Client: see `client/vite.config.ts` (default Vite port)

## CI (GitHub Actions)

Pushes and PRs run server tests, type-check, lint, and client build without AWS secrets. See `.github/workflows/ci.yml`.

## Restoring cloud hosting

1. Provision MongoDB Atlas (free tier) and set `MONGODB_URI`.
2. Set strong `JWT_SECRET` and Stripe keys in environment only (never commit).
3. Deploy API (e.g. Elastic Beanstalk, ECS, or Railway) and point `CLIENT_URL` to the frontend origin.
