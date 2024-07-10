import mongoose from 'mongoose';
import { OrganizationModel } from '../models/organization';
import { UserModel } from '../models/user';
import { OrganizationInput, OrganizationResponse, SimpleUser } from '../types';
import { ErrorWithStatus } from '../utils';

export const addOrganization = async (userId: string, data: OrganizationInput): Promise<OrganizationResponse> => {
  const organization = new OrganizationModel({
    ...data,
    createdBy: userId,
    userCount: 1,
    users: [{ userId, role: 'admin' }],
  });

  const savedOrganization = await organization.save();

  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    {
      $push: { organizations: savedOrganization._id },
    },
    { new: true }
  );

  if (!updatedUser) {
    throw new ErrorWithStatus('User not found', 404, 'USER_NOT_FOUND');
  }

  return savedOrganization.toObject() as OrganizationResponse;
};

export const getOrganization = async (organizationId: string) => {
  const organization = await OrganizationModel.findById(organizationId).populate('users.userId', 'firstName lastName email');
  if (!organization) {
    throw new ErrorWithStatus('Organization not found', 404, 'ORGANIZATION_NOT_FOUND');
  }
  return organization;
};

export const getOrganizations = async (userId: string): Promise<OrganizationResponse[]> => {
  const organizations = await OrganizationModel.find({
    'users.userId': userId,
  });
  return organizations.map((org) => org.toObject() as OrganizationResponse);
};

export const updateOrganization = async (id: string, userId: string, data: OrganizationInput): Promise<OrganizationResponse> => {
  const organization = await OrganizationModel.findOneAndUpdate({ _id: id, createdBy: userId }, { $set: data }, { new: true });

  if (!organization) {
    throw new ErrorWithStatus('Organization not found or not authorized', 404, 'ORGANIZATION_NOT_FOUND');
  }

  return organization.toObject() as OrganizationResponse;
};

export const deleteOrganization = async (organizationId: string, userId: string): Promise<OrganizationResponse> => {
  const organization = await OrganizationModel.findOneAndDelete({
    _id: organizationId,
    createdBy: userId,
  });

  if (!organization) {
    throw new ErrorWithStatus('Organization not found or not authorized', 404, 'ORGANIZATION_NOT_FOUND');
  }

  await UserModel.findByIdAndUpdate(userId, {
    $pull: { organizations: organizationId },
  });

  return organization.toObject() as OrganizationResponse;
};

export const addUserToOrganization = async (organizationId: string, email: string, role: string): Promise<void> => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ErrorWithStatus('User not found', 404, 'USER_NOT_FOUND');
  }

  const organization = await OrganizationModel.findById(organizationId);
  if (!organization) {
    throw new ErrorWithStatus('Organization not found', 404, 'ORGANIZATION_NOT_FOUND');
  }

  if (organization.users.some((userRole) => userRole.userId.equals(user._id))) {
    throw new ErrorWithStatus('User already in organization', 400, 'USER_ALREADY_IN_ORG');
  }

  organization.users.push({ userId: user._id, role });
  organization.userCount += 1;
  await organization.save();

  await UserModel.findByIdAndUpdate(user._id, {
    $addToSet: { organizations: organization._id },
  });
};

export const removeUserFromOrganization = async (organizationId: string, userId: string): Promise<void> => {
  console.log(`Removing user: ${userId} from organization: ${organizationId}`);

  const organization = await OrganizationModel.findById(organizationId);
  if (!organization) {
    throw new ErrorWithStatus('Organization not found', 404, 'ORGANIZATION_NOT_FOUND');
  }

  console.log(`Organization before removal:`, organization);

  const userObjectId = new mongoose.Types.ObjectId(userId);
  const userIndex = organization.users.findIndex((userRole) => userRole.userId.equals(userObjectId));

  if (userIndex === -1) {
    console.error(`User with id: ${userId} not found in organization: ${organizationId}`);
    throw new ErrorWithStatus('User not found in organization', 404, 'USER_NOT_FOUND_IN_ORG');
  }

  organization.users.splice(userIndex, 1);
  organization.userCount -= 1;
  await organization.save();

  await UserModel.findByIdAndUpdate(userObjectId, {
    $pull: { organizations: organization._id },
  });

  console.log(`Organization after removal:`, organization);
  console.log(`User: ${userId} successfully removed from organization: ${organizationId}`);
};

export const leaveOrganization = async (organizationId: string, userId: string): Promise<void> => {
  const organization = await OrganizationModel.findById(organizationId);
  if (!organization) {
    throw new ErrorWithStatus('Organization not found', 404, 'ORGANIZATION_NOT_FOUND');
  }

  const userObjectId = new mongoose.Types.ObjectId(userId);
  const userIndex = organization.users.findIndex((userRole) => userRole.userId.equals(userObjectId));
  if (userIndex === -1) {
    throw new ErrorWithStatus('User not found in organization', 404, 'USER_NOT_FOUND_IN_ORG');
  }

  organization.users.splice(userIndex, 1);
  organization.userCount -= 1;
  await organization.save();

  await UserModel.findByIdAndUpdate(userObjectId, {
    $pull: { organizations: organization._id },
  });
};

export const getUsersFromOrganization = async (organizationId: string): Promise<SimpleUser[]> => {
  const organization = await OrganizationModel.findById(organizationId).populate('users.userId', 'firstName lastName email');
  if (!organization) {
    throw new ErrorWithStatus('Organization not found', 404, 'ORGANIZATION_NOT_FOUND');
  }

  return organization.users.map((userRole) => {
    const user = userRole.userId as unknown as SimpleUser;
    return {
      id: user.id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  });
};
