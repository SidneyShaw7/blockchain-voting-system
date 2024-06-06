import { Router } from 'express';
import { updateUserController } from '../controllers';
import { upload } from '../middleware';
import { updateUserValidationRules } from '../validations';
import { handleAsync, authenticate } from '../utils';

const router = Router();

router.put('/profile', authenticate, upload.single('avatar'), updateUserValidationRules(), handleAsync(updateUserController));

export default router;
