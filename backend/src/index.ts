import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { userRouter } from './api/routes';
import { logger } from './api/middleware';
import { config } from './api/config';
import { errorHandler } from './api/middleware';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
// app.use(logger);  // Ensure all requests are logged

// Connect to MongoDB
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => {
    logger.info('Connected to MongoDB.');
    startServer(); 
  })
  .catch((error) => {
    logger.error('Unable to connect to MongoDB.');
    logger.error(error.message); 
  });

// Function to start the Express server
function startServer() {
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
}

// Basic ping route for simple live checks
app.get('/ping', (_req, res) => {
  logger.info('Ping received, pong sent.');
  res.send('pong');
});

// User-related routes from the router
app.use('/api/users', userRouter);
app.use(errorHandler);

export default app;
