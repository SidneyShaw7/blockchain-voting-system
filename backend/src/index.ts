import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import helmet from 'helmet';
import { loginRouter, registerRouter, votingEventRouter } from './api/routes';
import { logger } from './api/middleware';
import { config, corsConfig } from './api/config';
import { errorMiddleware } from './api/middleware';
import { ErrorWithStatus } from './api/types';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware
app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());
// app.use(logger);  // Ensure all requests are logged

if (!config.mongo.url) {
  logger.error('MongoDB URL is not configured. Please check your environment variables.');
  process.exit(1);
}
// Connect to MongoDB
mongoose
  .connect(config.mongo.url, {
    retryWrites: true,
    w: 'majority',
  })
  .then(() => {
    logger.info('Connected to MongoDB.');
    startServer();
  })
  .catch((error: ErrorWithStatus) => {
    logger.error('Unable to connect to MongoDB.', { error: error.message });
    process.exit(1);
  });

// func to start the Express server
function startServer() {
  app.listen(config.server.port, () => {
    logger.info(`Server running on port ${config.server.port}`);
  });
}

// HTTP auth middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  } else {
    return next();
  }
});

// req logging middleware
app.use((req, res, next) => {
  logger.info(`Incoming -> Method: [${req.method}] - URL: [${req.path}] - IP: [${req.ip}]`);
  res.on('finish', () => {
    logger.info(`Outgoing -> Method: [${req.method}] - URL: [${req.path}] - Status: [${res.statusCode}] - IP: [${req.ip}]`);
  });
  next();
});

// Basic ping route for simple live checks
app.get('/ping', (_req, res) => {
  logger.info('Ping received, pong sent.');
  res.send('pong');
});

// User-related routes from the router
app.use('/api/users', registerRouter, loginRouter);
// app.use('/api/users', loginRouter);
app.use('/api/events', votingEventRouter);
app.use(errorMiddleware);

export default app;
