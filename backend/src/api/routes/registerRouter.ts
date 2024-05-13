import express from 'express';
import { registerUserController } from '../controllers';
import { registerValidationRules } from '../validations';
import { handleAsync } from '../utils';

const router = express.Router();

router.post('/register', registerValidationRules(), handleAsync(registerUserController));

export default router;
