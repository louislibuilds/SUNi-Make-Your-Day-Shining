import { Request, Response, NextFunction } from 'express';

const ALLOWED_SORT = new Set([
  'createdAt',
  '-createdAt',
  'price.base',
  '-price.base',
  'name',
  '-name',
]);

export const validateProductListQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors: string[] = [];
  const { page, limit, sort, minPrice, maxPrice, search } = req.query;

  if (page !== undefined) {
    const pageNum = Number(page);
    if (!Number.isInteger(pageNum) || pageNum < 1) {
      errors.push('page must be a positive integer');
    }
  }

  if (limit !== undefined) {
    const limitNum = Number(limit);
    if (!Number.isInteger(limitNum) || limitNum < 1 || limitNum > 100) {
      errors.push('limit must be an integer between 1 and 100');
    }
  }

  if (sort !== undefined && typeof sort === 'string' && !ALLOWED_SORT.has(sort)) {
    errors.push('sort uses an unsupported field');
  }

  if (minPrice !== undefined && Number.isNaN(Number(minPrice))) {
    errors.push('minPrice must be numeric');
  }

  if (maxPrice !== undefined && Number.isNaN(Number(maxPrice))) {
    errors.push('maxPrice must be numeric');
  }

  if (
    search !== undefined &&
    (typeof search !== 'string' || search.length > 120)
  ) {
    errors.push('search must be a string up to 120 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};
