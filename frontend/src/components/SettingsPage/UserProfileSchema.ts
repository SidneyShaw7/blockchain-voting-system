import { z } from 'zod';

export const UserProfileSchema = z.object({
  firstName: z.string().min(3, 'First Name is required').max(50, 'First Name must be between 2 and 50 characters'),
  lastName: z.string().min(3, 'Last Name is required').max(50, 'Last Name must be between 2 and 50 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(8, 'Current Password is required'),
  newPassword: z
    .string()
    .optional()
    .refine((value) => {
      if (!value) return true;
      return value.length >= 8;
    }, 'New Password must be at least 8 characters long')
    .refine((value) => {
      if (!value) return true;
      return /(?=.*\d)(?=.*[A-Z])(?=.*[A-Z])(?=.*\W)/.test(value);
    }, 'New Password must contain at least one number, one uppercase letter, and one special character'),
  avatar: z.instanceof(File).optional(),
});

export type UserProfileFormValues = z.infer<typeof UserProfileSchema>;
