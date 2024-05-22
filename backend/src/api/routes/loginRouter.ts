import express from 'express';
import { loginUserController, logoutUserController, refreshTokenController } from '../controllers';
import { loginValidationRules } from '../validations';
import { handleAsync } from '../utils';

const router = express.Router();

router.post('/login', loginValidationRules(), handleAsync(loginUserController));
router.post('/logout', handleAsync(logoutUserController));
router.post('/refresh-token', handleAsync(refreshTokenController));

export default router;
