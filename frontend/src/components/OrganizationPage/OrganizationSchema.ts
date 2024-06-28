import { z } from 'zod';

export const OrganizationSchema = z.object({
  name: z.string().min(2, 'Organization name must be between 2 and 50 characters').max(50, 'Organization name must be between 2 and 50 characters'),
  location: z.string().min(2, 'Location must be between 2 and 100 characters').max(100, 'Location must be between 2 and 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  logo: z.instanceof(File).optional(),
  billingInfo: z.string().min(2, 'Billing info must be between 2 and 100 characters').max(100, 'Billing info must be between 2 and 100 characters'),
  billingEmail: z.string().email('Must be a valid email'),
  roles: z
    .array(
      z.object({
        userId: z.string(),
        role: z.string(),
      })
    )
    .optional(),
});

export type OrganizationFormValues = z.infer<typeof OrganizationSchema>;
