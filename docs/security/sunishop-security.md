# SUNi Shop — Security summary (43030 Goal 2)

**Project:** [SUNi-Make-Your-Day-Shining](https://github.com/LouisLi1020/SUNi-Make-Your-Day-Shining)  
**Student:** ChengYi Li · 25526411 · UTS 43030 Autumn 2026

## Scope

This document records security improvements applied during the Professional Learning Plan (Assessment Task 1 / 3), aligned with OWASP-aware practice and secure SDLC expectations for a MERN e-commerce API.

## Threats considered

| Threat | Example | Mitigation implemented |
|--------|---------|----------------------|
| Injection (A03:2021) | NoSQL operator in JSON body (`$gt`, `$where`) | `sanitizeRequest` strips `$` / `.` keys on `body`, `query`, `params` |
| Broken authentication (A07:2021) | Credential stuffing | `authRateLimit` on `/api/auth/*`; account lockout in `User` model |
| Unvalidated input (A03 / API4:2023) | Oversized pagination, malformed email | `validateRegister`, `validateLogin`, `validateProductListQuery` |
| Security misconfiguration (A05:2021) | Missing headers, verbose errors | `securityHeaders`; `x-powered-by` disabled; JSON body limit 1mb |
| Unrestricted resource consumption | API abuse | Global `/api` rate limit (300 req / 15 min per IP) |

## Authentication controls

- JWT bearer tokens; secrets from environment (`JWT_SECRET`).
- Registration/login validated before controller logic (email format, password ≥ 8 characters).
- Role-based routes: admin-only product mutations via `requireAdmin`.
- Passwords hashed with bcrypt in the User model (existing).

## Dependency & operations

- Run `npm audit` in `/server` before releases; CI runs audit at high severity (report-only).
- Production used AWS hosting previously; instance stopped when university credits ended. Evidence for this subject: **local run**, **GitHub Actions CI**, and this document—not a live production URL.

## Residual risks / next steps

- Frontend still uses mock data on some pages; full API integration will need CSRF strategy if using cookies.
- `GET /api/products/stats` remains public; consider admin-only before production.
- Add helmet + structured logging (e.g. pino) and dependency scanning (Dependabot) in a future sprint.

## Evidence links

- Middleware: `server/src/middleware/security.ts`, `validateAuth.ts`, `validateProductQuery.ts`
- Tests: `server/src/__tests__/`
- CI: `.github/workflows/ci.yml`

## References

- OWASP Top 10 (2021): https://owasp.org/Top10/
- UTS 43030 cybersecurity module materials (Canvas)
