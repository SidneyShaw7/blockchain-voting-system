import { z } from 'zod';

export const LoginSchema = z.object({
  usernameOrEmail: z.string().min(3, { message: 'Username or email is required' }),
  password: z.string().min(8, { message: 'Password is required' }),
});

export type LoginFormValues = z.infer<typeof LoginSchema>;
