import { z } from 'zod';

export const RegistrationSchema = z
  .object({
    firstName: z.string().min(3, { message: 'First name is required' }),
    lastName: z.string().min(3, { message: 'Last name is required' }),
    username: z.string().min(3, { message: 'Username is required' }),
    email: z.string().email('Invalid email address').nonempty('Email is required'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'Password must include at least one number, one uppercase letter, and one special character'),
    passwordConfirmation: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'Password must include at least one number, one uppercase letter, and one special character'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: "Passwords don't match",
  });
