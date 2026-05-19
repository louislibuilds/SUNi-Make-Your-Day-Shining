import mongoose from 'mongoose';
import { createApp } from './app';
import connectDB, { createIndexes, seedInitialData } from './config/database';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await createIndexes();
    await seedInitialData();

    const app = createApp();
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
    });

    const gracefulShutdown = (signal: string) => {
      console.log(`Received ${signal}. Shutting down...`);
      server.close(() => {
        mongoose.connection.close().then(() => process.exit(0));
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}
