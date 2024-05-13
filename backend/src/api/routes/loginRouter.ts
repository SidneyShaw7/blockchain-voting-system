import express from 'express';
import { loginUserController, logoutUserController } from '../controllers';
import { loginValidationRules } from '../validations';
import { handleAsync } from '../utils';

const router = express.Router();

router.post('/login', loginValidationRules(), handleAsync(loginUserController));
router.post('/logout', handleAsync(logoutUserController));

export default router;
