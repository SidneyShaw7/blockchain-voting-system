import { OrganizationModel } from '../models/organization';
import { User } from '../types';
import { OrganizationInput, OrganizationResponse, OrganizationValues } from '../types';

type PopulatedOrganization = Omit<OrganizationValues, 'createdBy'> & { createdBy: User };

export const getOrganizations = async (userId: string): Promise<OrganizationResponse[]> => {
  const organizations = await OrganizationModel.find({ createdBy: userId }).populate('createdBy', 'firstName lastName');
  return organizations.map((org) => {
    const populatedOrg = org.toObject() as PopulatedOrganization;
    return {
      id: populatedOrg._id.toString(),
      name: populatedOrg.name,
      location: populatedOrg.location,
      description: populatedOrg.description,
      logo: populatedOrg.logo,
      role: populatedOrg.role,
      userCount: populatedOrg.userCount,
      billingInfo: populatedOrg.billingInfo,
      billingEmail: populatedOrg.billingEmail,
      createdBy: {
        id: populatedOrg.createdBy.id!.toString(),
        firstName: populatedOrg.createdBy.firstName,
        lastName: populatedOrg.createdBy.lastName,
      },
    };
  });
};

export const updateOrganization = async (id: string, userId: string, data: OrganizationInput): Promise<OrganizationResponse> => {
  const organization = await OrganizationModel.findOneAndUpdate(
    { _id: id, createdBy: userId },
    { $set: data },
    { new: true }
  ).populate('createdBy', 'firstName lastName');

  if (!organization) {
    throw new Error('Organization not found or not authorized');
  }

  const populatedOrg = organization.toObject() as PopulatedOrganization;

  return {
    id: populatedOrg._id.toString(),
    name: populatedOrg.name,
    location: populatedOrg.location,
    description: populatedOrg.description,
    logo: populatedOrg.logo,
    role: populatedOrg.role,
    userCount: populatedOrg.userCount,
    billingInfo: populatedOrg.billingInfo,
    billingEmail: populatedOrg.billingEmail,
    createdBy: {
      id: populatedOrg.createdBy.id!.toString(), // Ensure this is correct
      firstName: populatedOrg.createdBy.firstName,
      lastName: populatedOrg.createdBy.lastName,
    },
  };
};
