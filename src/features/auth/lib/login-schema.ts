import {z} from 'zod';

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'auth.validation.username.min')
    .max(30, 'auth.validation.username.max'),
  password: z
    .string()
    .min(6, 'auth.validation.password.min')
    .max(100, 'auth.validation.password.max'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
