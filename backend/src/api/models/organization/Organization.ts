import mongoose, { Document, Schema } from 'mongoose';
import { OrganizationValues } from '../../types';

const OrganizationSchema = new Schema<OrganizationValues>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    logo: { type: String },
    role: { type: String, required: true },
    userCount: { type: Number, default: 0 },
    billingInfo: { type: String, required: true },
    billingEmail: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const OrganizationModel = mongoose.model<OrganizationValues & Document>('Organization', OrganizationSchema);
