import { Router } from 'express';
import {
  getOrganizationsController,
  updateOrganizationController,
  addOrganizationController,
  deleteOrganizationController,
  addUserToOrganizationController,
  removeUserFromOrganizationController,
  leaveOrganizationController,
} from '../controllers';
import { organizationValidationRules } from '../validations/organizationValidation';
import { handleAsync, authenticate } from '../utils';
import { upload } from '../middleware';

const router = Router();

router.post(
  '/create',
  authenticate,
  upload.single('logo'),
  organizationValidationRules(),
  handleAsync(addOrganizationController)
);
router.get('/', authenticate, handleAsync(getOrganizationsController));
router.put('/:organizationId', authenticate, organizationValidationRules(), handleAsync(updateOrganizationController));
router.delete('/:organizationId', authenticate, handleAsync(deleteOrganizationController));
router.post('/:organizationId/invite', authenticate, handleAsync(addUserToOrganizationController));
router.delete('/:organizationId/users/:userId', authenticate, handleAsync(removeUserFromOrganizationController));
router.post('/:organizationId/leave', authenticate, handleAsync(leaveOrganizationController));

export default router;
