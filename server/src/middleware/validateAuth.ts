import { Request, Response, NextFunction } from 'express';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 8;

const validationError = (res: Response, errors: string[]) =>
  res.status(400).json({
    success: false,
    message: 'Validation failed',
    errors,
  });

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const { email, name, password, confirmPassword } = req.body ?? {};
  const errors: string[] = [];

  if (typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    errors.push('A valid email address is required');
  }
  if (typeof name !== 'string' || name.trim().length < 2 || name.length > 80) {
    errors.push('Name must be between 2 and 80 characters');
  }
  if (typeof password !== 'string' || password.length < PASSWORD_MIN_LENGTH) {
    errors.push(`Password must be at least ${PASSWORD_MIN_LENGTH} characters`);
  }
  if (password !== confirmPassword) {
    errors.push('Passwords do not match');
  }
  if (req.body?.role && !['guest', 'member', 'staff', 'admin'].includes(req.body.role)) {
    errors.push('Invalid role');
  }

  if (errors.length > 0) {
    return validationError(res, errors);
  }

  req.body.email = email.trim().toLowerCase();
  req.body.name = name.trim();
  next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body ?? {};
  const errors: string[] = [];

  if (typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    errors.push('A valid email address is required');
  }
  if (typeof password !== 'string' || password.length < 1) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return validationError(res, errors);
  }

  req.body.email = email.trim().toLowerCase();
  next();
};
