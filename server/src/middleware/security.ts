import { Request, Response, NextFunction } from 'express';

const INJECTION_PATTERN = /^\$|\./;

export const stripInjectionKeys = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map(stripInjectionKeys);
  }
  if (value && typeof value === 'object') {
    const cleaned: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
      if (INJECTION_PATTERN.test(key) || key.includes('$')) {
        continue;
      }
      cleaned[key] = stripInjectionKeys(nested);
    }
    return cleaned;
  }
  return value;
};

export const sanitizeRequest = (req: Request, _res: Response, next: NextFunction) => {
  if (req.body) {
    req.body = stripInjectionKeys(req.body) as Request['body'];
  }
  if (req.query) {
    req.query = stripInjectionKeys(req.query) as Request['query'];
  }
  if (req.params) {
    req.params = stripInjectionKeys(req.params) as Request['params'];
  }
  next();
};

export const securityHeaders = (_req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-XSS-Protection', '0');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'none'; frame-ancestors 'none'; base-uri 'none'"
  );
  next();
};

export const apiRateLimit = (maxRequests: number, windowMs: number) => {
  const hits = new Map<string, { count: number; resetTime: number }>();

  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.ip || 'unknown';
    const now = Date.now();
    const entry = hits.get(key);

    if (!entry || now > entry.resetTime) {
      hits.set(key, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (entry.count >= maxRequests) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.',
        retryAfter: Math.ceil((entry.resetTime - now) / 1000),
      });
    }

    entry.count += 1;
    next();
  };
};
