import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { checkDatabaseHealth } from './config/database';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import {
  securityHeaders,
  sanitizeRequest,
  apiRateLimit,
} from './middleware/security';

import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import productRoutes from './routes/products';
import profileRoutes from './routes/profile';
import cartRoutes from './routes/cart';
import checkoutRoutes from './routes/checkout';
import paymentRoutes from './routes/payment';
import orderConfirmationRoutes from './routes/orderConfirmation';

dotenv.config();

export const createApp = () => {
  const app = express();

  app.disable('x-powered-by');
  app.use(securityHeaders);
  app.use(
    cors({
      origin: process.env.CLIENT_URL || 'http://localhost:5176',
      credentials: true,
    })
  );
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));
  app.use(sanitizeRequest);
  app.use('/api', apiRateLimit(300, 15 * 60 * 1000));

  app.get('/', (_req, res) => {
    res.json({
      message: 'Suni API Server is running',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
    });
  });

  app.get('/health', async (_req, res) => {
    try {
      const dbHealth = await checkDatabaseHealth();
      res.json({
        status: dbHealth ? 'OK' : 'DEGRADED',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: dbHealth ? 'Connected' : 'Disconnected',
        environment: process.env.NODE_ENV || 'development',
      });
    } catch (error) {
      res.status(503).json({
        status: 'ERROR',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: 'Error',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/profile', profileRoutes);
  app.use('/api/cart', cartRoutes);
  app.use('/api/checkout', checkoutRoutes);
  app.use('/api/payment', paymentRoutes);
  app.use('/api/orders', orderConfirmationRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};

export default createApp;
