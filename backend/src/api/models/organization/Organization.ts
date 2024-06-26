import mongoose, { Document, Schema } from 'mongoose';
import { OrganizationValues } from '../../types';
import { addIdVirtual } from '../../utils';

const UserRoleSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, required: true },
  },
  { _id: false }
);

const OrganizationSchema = new Schema<OrganizationValues>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    logo: { type: String },
    userCount: { type: Number, default: 0 },
    billingInfo: { type: String, required: true },
    billingEmail: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    users: [UserRoleSchema],
  },
  { timestamps: true }
);

addIdVirtual(OrganizationSchema);

export const OrganizationModel = mongoose.model<OrganizationValues & Document>('Organization', OrganizationSchema);
