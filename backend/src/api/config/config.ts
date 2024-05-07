import dotenvSafe from 'dotenv-safe';
import path from 'path';

const loadEnvironmentVariables = (): void => {
  try {
    dotenvSafe.config({
      allowEmptyValues: process.env.NODE_ENV !== 'production',
      path: path.join(process.cwd(), '.env'), // process.cwd for robust path solution
      example: path.join(process.cwd(), '.env.example'),
    });
    console.log('Environment variables loaded successfully.');
  } catch (error) {
    console.error('Failed to load environment variables:', error);
    process.exit(1);
  }
};

loadEnvironmentVariables();

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL as string;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

const corsConfig = {
  origin: process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
};

const config = {
  mongo: {
    url: MONGODB_URL,
  },
  server: {
    port: PORT,
  },
};

export { config, corsConfig };
