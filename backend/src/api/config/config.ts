import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || '';

const config = {
  mongo: {
    url: MONGODB_URL,
  },
  server: {
    port: PORT,
  },
};

export { config };
