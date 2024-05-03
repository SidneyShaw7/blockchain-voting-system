import express from 'express';
import { registerUserController } from '../controllers';
import { registerValidationRules } from '../validations';
import { asyncHandler } from '../middleware';

const router = express.Router();

router.post('/register', registerValidationRules(), asyncHandler(registerUserController));

export default router;
