import { OrganizationModel } from '../models/organization';
import { UserModel } from '../models/user';
import { OrganizationInput, OrganizationResponse } from '../types';
import { ErrorWithStatus } from '../utils';

export const addOrganization = async (userId: string, data: OrganizationInput): Promise<OrganizationResponse> => {
  const organization = new OrganizationModel({
    ...data,
    createdBy: userId,
    userCount: 1,
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

  const populatedOrg = await savedOrganization.populate('createdBy', 'firstName lastName');

  return populatedOrg.toObject() as OrganizationResponse;
};

export const getOrganizations = async (userId: string): Promise<OrganizationResponse[]> => {
  const organizations = await OrganizationModel.find({ createdBy: userId }).populate('createdBy', 'firstName lastName');
  return organizations.map((org) => org.toObject() as OrganizationResponse);
};

export const updateOrganization = async (id: string, userId: string, data: OrganizationInput): Promise<OrganizationResponse> => {
  const organization = await OrganizationModel.findOneAndUpdate(
    { _id: id, createdBy: userId },
    { $set: data },
    { new: true }
  ).populate('createdBy', 'firstName lastName');

  if (!organization) {
    throw new ErrorWithStatus('Organization not found or not authorized', 404, 'ORGANIZATION_NOT_FOUND');
  }

  return organization.toObject() as OrganizationResponse;
};

export const deleteOrganization = async (organizationId: string, userId: string): Promise<OrganizationResponse> => {
  const organization = await OrganizationModel.findOneAndDelete({
    _id: organizationId,
    createdBy: userId,
  }).populate('createdBy', 'firstName lastName');

  if (!organization) {
    throw new ErrorWithStatus('Organization not found or not authorized', 404, 'ORGANIZATION_NOT_FOUND');
  }

  await UserModel.findByIdAndUpdate(userId, {
    $pull: { organizations: organizationId },
  });

  return organization.toObject() as OrganizationResponse;
};

// export const addUserToOrganization = async (organizationId: string, userId: string): Promise<OrganizationResponse> => {
//   const organization = await OrganizationModel.findById(organizationId);

//   if (!organization) {
//     throw new ErrorWithStatus('Organization not found', 404, 'ORGANIZATION_NOT_FOUND');
//   }

//   // Assuming users field in organization stores user ids
//   const userExists = organization.users.some((user) => user.toString() === userId);
//   if (userExists) {
//     throw new ErrorWithStatus('User already in organization', 400, 'USER_ALREADY_IN_ORG');
//   }

//   organization.users.push(userId);
//   organization.userCount += 1;
//   await organization.save();

//   const populatedOrg = await organization.populate('createdBy', 'firstName lastName');

//   return populatedOrg.toObject() as OrganizationResponse;
// };
