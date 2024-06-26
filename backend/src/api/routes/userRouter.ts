import { Router } from 'express';
import { updateUserController, getUsersController } from '../controllers';
import { upload } from '../middleware';
import { updateUserValidationRules } from '../validations';
import { handleAsync, authenticate } from '../utils';

const router = Router();

router.put('/profile', authenticate, upload.single('avatar'), updateUserValidationRules(), handleAsync(updateUserController));
router.post('/getUsers', authenticate, handleAsync(getUsersController));

export default router;
