import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

const corsConfig = {
  origin: process.env.NODE_ENV === 'development' ? '*' : CORS_ORIGIN,
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
