# Deployment

Hosting guide for staging or production. Designed for **solo maintenance** — managed services over self-hosted ops.

## Recommended stack

| Layer | Service | Why |
|-------|---------|-----|
| **Database** | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) M0 | Mongoose schemas already in place; backups and TLS included |
| **API** | [Railway](https://railway.app) or [Fly.io](https://fly.io) | Fast Node deploy, env vars, HTTPS |
| **Frontend** | [Vercel](https://vercel.com) | Vite static build, CDN, preview deploys |
| **Payments** | [Stripe](https://stripe.com) | Checkout + webhooks (test mode first) |
| **Email** | [Resend](https://resend.com) or SendGrid | Order email without self-hosted SMTP |

```
User → Vercel (client/build) → Railway/Fly (server/) → MongoDB Atlas
                                      ↘ Stripe, email
```

## Prerequisites

- Repo on GitHub: `louislibuilds/SUNi-Make-Your-Day-Shining`
- Node 20 locally (for seeding)
- Accounts: Atlas, Railway or Fly, Vercel, Stripe (test)

---

## 1. MongoDB Atlas

1. Create **M0 FREE** cluster (e.g. region `ap-southeast-2`).
2. **Database Access** → database user + password.
3. **Network Access** → allow `0.0.0.0/0` for staging (tighten later).
4. Copy connection string:

   ```
   mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/suni?retryWrites=true&w=majority
   ```

---

## 2. API on Railway

1. New project → Deploy from GitHub → root directory **`server`**.
2. Build: `npm ci && npm run build`
3. Start: `npm start`

**Environment variables** (never commit):

| Variable | Notes |
|----------|--------|
| `NODE_ENV` | `production` |
| `MONGODB_URI` | Atlas connection string |
| `JWT_SECRET` | Min 32 chars — `openssl rand -base64 32` |
| `JWT_EXPIRE` | `7d` |
| `CLIENT_URL` | Vercel URL (set after frontend deploy) |
| `STRIPE_SECRET_KEY` | `sk_test_...` |
| `STRIPE_PUBLISHABLE_KEY` | `pk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | From Stripe dashboard |

See [`server/env.example`](../server/env.example) for the full list.

**Seed staging DB** (from your machine):

```bash
cd server
# .env with Atlas MONGODB_URI
npm run seed
```

**Verify:**

```bash
curl https://<railway-domain>/health
curl https://<railway-domain>/api/products
```

---

## 3. Frontend on Vercel

1. Import repo → root directory **`client`**.
2. Framework: Vite.
3. Build: `npm run build`
4. Output directory: **`build`** (see `client/vite.config.ts`).

| Variable | Value |
|----------|--------|
| `VITE_API_URL` | `https://<railway-domain>` |

Redeploy, then set Railway `CLIENT_URL` to the Vercel URL (CORS).

**Custom domain (optional):** `shop.yourdomain.com` on Vercel → update `CLIENT_URL` on the API.

---

## 4. Stripe webhooks

1. Stripe Dashboard → Webhooks → add endpoint.
2. URL: `https://<railway-domain>/api/payment/webhook` (confirm path in `server/src/routes/payment.ts`).
3. Copy signing secret → `STRIPE_WEBHOOK_SECRET` on Railway.

Local testing:

```bash
stripe listen --forward-to localhost:5000/api/payment/webhook
```

---

## Production checklist

| Check | Staging | Production |
|-------|---------|------------|
| Unique `JWT_SECRET` | ☐ | ☐ rotate |
| Secrets only in host env | ☐ | ☐ |
| `CLIENT_URL` matches Vercel exactly | ☐ | ☐ |
| Stripe test vs live keys | test | live |
| `/health` monitored | optional | ☐ |

---

## Fly.io alternative (API)

```bash
cd server
fly launch --name suni-api
fly secrets set MONGODB_URI=... JWT_SECRET=... CLIENT_URL=...
fly deploy
```

---

## Troubleshooting

| Symptom | Likely cause |
|---------|----------------|
| CORS error | `CLIENT_URL` ≠ frontend origin |
| DB disconnected | Wrong `MONGODB_URI` or Atlas IP block |
| Empty products | Run `npm run seed` on target database |
| Webhook 400 | Wrong `STRIPE_WEBHOOK_SECRET` |

---

## Not in scope (for now)

- Self-hosted MongoDB on a VPS
- Redis (not used in server code)
- Full Docker production stack — use managed hosts above
