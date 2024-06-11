import { Request, Response, NextFunction } from 'express';
import { getOrganizations, updateOrganization } from '../services/organizationService';
import { handleValidationErrors, ErrorWithStatus } from '../utils';

export const getOrganizationsController = async (req: Request, res: Response, next: NextFunction) => {
  handleValidationErrors(req);

  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new ErrorWithStatus('User ID is missing', 400, 'USER_ID_MISSING');
    }

    const organizations = await getOrganizations(userId);
    res.json(organizations);
  } catch (error) {
    next(
      new ErrorWithStatus('Failed to get organizations', 500, 'GET_ORGANIZATIONS_ERROR', {
        detail: error instanceof Error ? error.message : 'Unknown error',
      })
    );
  }
};

export const updateOrganizationController = async (req: Request, res: Response, next: NextFunction) => {
  handleValidationErrors(req);

  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new ErrorWithStatus('User ID is missing', 400, 'USER_ID_MISSING');
    }

    const { id } = req.params;
    const data = req.body;
    const updatedOrganization = await updateOrganization(id, userId, data);
    res.json(updatedOrganization);
  } catch (error) {
    next(
      new ErrorWithStatus('Failed to update organization', 500, 'UPDATE_ORGANIZATION_ERROR', {
        detail: error instanceof Error ? error.message : 'Unknown error',
      })
    );
  }
};
