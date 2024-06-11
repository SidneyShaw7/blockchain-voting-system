import { Router } from 'express';
import { getOrganizationsController, updateOrganizationController } from '../controllers/organizationController';
import { organizationValidationRules } from '../validations/organizationValidation';
import { handleAsync, authenticate } from '../utils';

const router = Router();

router.get('/', authenticate, handleAsync(getOrganizationsController));
router.put('/:id', authenticate, organizationValidationRules(), handleAsync(updateOrganizationController));

export default router;
