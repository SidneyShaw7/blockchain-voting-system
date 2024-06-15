import { Request, Response, NextFunction } from 'express';
import { getOrganizations, updateOrganization, addOrganization, deleteOrganization } from '../services';
import { handleValidationErrors, ErrorWithStatus, checkUserAuthentication } from '../utils';

export const addOrganizationController = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Request body:', req.body);
  console.log('User ID:', req.user._id.toString());
  handleValidationErrors(req);
  checkUserAuthentication(req);

  try {
    const userId = req.user._id.toString();
    if (!userId) {
      throw new ErrorWithStatus('User ID is missing', 400, 'USER_ID_MISSING');
    }

    const data = req.body;
    const newOrganization = await addOrganization(userId, data);
    res.status(201).json({
      message: 'Organization created successfully',
      organization: {
        id: newOrganization.id,
        name: newOrganization.name,
        location: newOrganization.location,
        description: newOrganization.description,
        logo: newOrganization.logo,
        role: newOrganization.role,
        userCount: newOrganization.userCount,
        billingInfo: newOrganization.billingInfo,
        billingEmail: newOrganization.billingEmail,
        createdBy: newOrganization.createdBy,
      },
    });
  } catch (error) {
    next(
      new ErrorWithStatus('Failed to add organization', 500, 'ADD_ORGANIZATION_ERROR', {
        detail: error instanceof Error ? error.message : 'Unknown error',
      })
    );
  }
};
export const getOrganizationsController = async (req: Request, res: Response, next: NextFunction) => {
  handleValidationErrors(req);
  checkUserAuthentication(req);

  try {
    const userId = req.user._id.toString();
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
  checkUserAuthentication(req);

  try {
    const userId = req.user._id.toString();
    if (!userId) {
      throw new ErrorWithStatus('User ID is missing', 400, 'USER_ID_MISSING');
    }

    const { id } = req.params;
    const data = req.body;
    const updatedOrganization = await updateOrganization(id, userId, data);
    res.json({
      message: 'Organization updated successfully',
      organization: updatedOrganization,
    });
  } catch (error) {
    next(
      new ErrorWithStatus('Failed to update organization', 500, 'UPDATE_ORGANIZATION_ERROR', {
        detail: error instanceof Error ? error.message : 'Unknown error',
      })
    );
  }
};

export const deleteOrganizationController = async (req: Request, res: Response, next: NextFunction) => {
  handleValidationErrors(req);
  checkUserAuthentication(req);

  try {
    const userId = req.user._id.toString();
    const { id } = req.params;

    const deletedOrganization = await deleteOrganization(id, userId);
    res.status(200).json({
      message: 'Organization deleted successfully',
      organization: deletedOrganization,
    });
  } catch (error) {
    next(
      new ErrorWithStatus('Failed to delete organization', 500, 'DELETE_ORGANIZATION_ERROR', {
        detail: error instanceof Error ? error.message : 'Unknown error',
      })
    );
  }
};
