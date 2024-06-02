import { z } from 'zod';

export const UserProfileSchema = z.object({
  firstName: z.string().nonempty('First Name is required'),
  lastName: z.string().nonempty('Last Name is required'),
  username: z.string().nonempty('Username is required'),
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  currentPassword: z.string().nonempty('Current Password is required'),
  newPassword: z.string().optional(),
  avatar: z.instanceof(File).optional(),
});

export type UserProfileFormValues = z.infer<typeof UserProfileSchema>;
