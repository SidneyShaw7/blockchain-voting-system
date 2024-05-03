import express from 'express';
import { loginUserController, logoutUserController } from '../controllers';
import { loginValidationRules } from '../validations';
import { asyncHandler } from '../middleware';

const router = express.Router();

router.post('/login', loginValidationRules(), asyncHandler(loginUserController));
router.post('/logout', asyncHandler(logoutUserController));

export default router;
