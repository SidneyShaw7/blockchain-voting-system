import express from 'express';
import cors from 'cors';
import { userRouter } from './api/routes';
// import { logger, MONGODB_URL } from './api/middleware';

const app = express();
app.use(express.json());

// Use middleware
app.use(cors);
app.use('/api/users', userRouter);
// app.use(logger);
