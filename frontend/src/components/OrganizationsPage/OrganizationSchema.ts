import { z } from 'zod';

export const OrganizationSchema = z.object({
  name: z.string().min(1, 'Organisation Name is required'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().optional(),
  logo: z.instanceof(File).optional(),
  role: z.string().min(1, 'Role is required'),
});

export type OrganizationFormValues = z.infer<typeof OrganizationSchema>;
