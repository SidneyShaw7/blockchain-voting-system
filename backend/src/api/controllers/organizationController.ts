import { Request, Response, NextFunction } from 'express';
import {
  getOrganizations,
  updateOrganization,
  addOrganization,
  deleteOrganization,
  addUserToOrganization,
  removeUserFromOrganization,
  leaveOrganization,
} from '../services';
import { handleValidationErrors, ErrorWithStatus, checkUserAuthentication } from '../utils';

export const addOrganizationController = async (req: Request, res: Response, next: NextFunction) => {
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
      organization: newOrganization,
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
    const { organizationId } = req.params;

    const deletedOrganization = await deleteOrganization(organizationId, userId);
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

export const addUserToOrganizationController = async (req: Request, res: Response, next: NextFunction) => {
  handleValidationErrors(req);
  checkUserAuthentication(req);

  try {
    const { organizationId } = req.params;
    const { email, role } = req.body; // role is added to the request body

    await addUserToOrganization(organizationId, email, role);
    res.status(200).json({ message: 'User added to organization successfully' });
  } catch (error) {
    next(
      new ErrorWithStatus('Failed to add user to organization', 500, 'ADD_USER_TO_ORGANIZATION_ERROR', {
        detail: error instanceof Error ? error.message : 'Unknown error',
      })
    );
  }
};

export const removeUserFromOrganizationController = async (req: Request, res: Response, next: NextFunction) => {
  handleValidationErrors(req);
  checkUserAuthentication(req);

  try {
    const { organizationId } = req.params;
    const { userId } = req.body;

    await removeUserFromOrganization(organizationId, userId);
    res.status(200).json({ message: 'User removed from organization successfully' });
  } catch (error) {
    next(
      new ErrorWithStatus('Failed to remove user from organization', 500, 'REMOVE_USER_FROM_ORGANIZATION_ERROR', {
        detail: error instanceof Error ? error.message : 'Unknown error',
      })
    );
  }
};

export const leaveOrganizationController = async (req: Request, res: Response, next: NextFunction) => {
  handleValidationErrors(req);
  checkUserAuthentication(req);

  try {
    const userId = req.user._id.toString();
    const { organizationId } = req.params;

    await leaveOrganization(organizationId, userId);
    res.status(200).json({ message: 'Left organization successfully' });
  } catch (error) {
    next(
      new ErrorWithStatus('Failed to leave organization', 500, 'LEAVE_ORGANIZATION_ERROR', {
        detail: error instanceof Error ? error.message : 'Unknown error',
      })
    );
  }
};
