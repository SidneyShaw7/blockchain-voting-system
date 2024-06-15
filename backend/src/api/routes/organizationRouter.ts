import { Router } from 'express';
import { getOrganizationsController, updateOrganizationController, addOrganizationController } from '../controllers';
import { organizationValidationRules } from '../validations/organizationValidation';
import { handleAsync, authenticate } from '../utils';
import { upload } from '../middleware';

const router = Router();

router.post('/add', authenticate, upload.single('logo'), organizationValidationRules(), handleAsync(addOrganizationController));
router.get('/', authenticate, handleAsync(getOrganizationsController));
router.put('/:id', authenticate, organizationValidationRules(), handleAsync(updateOrganizationController));

export default router;
