import express from 'express';
import { registerUser } from '../controllers/';
import { loginUser } from '../controllers/';
import { loginValidationRules, registerValidationRules } from '../validations';
import { asyncHandler } from '../middleware';

const router = express.Router();

router.post('/login', loginValidationRules(), asyncHandler(loginUser));
router.post('/register', registerValidationRules(), asyncHandler(registerUser));

export default router;
