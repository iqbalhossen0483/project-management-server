import { z } from 'zod';
import { USER_ROLE } from '../types/common';

export const registerSchema = z
  .object({
    name: z
      .string('Name is required')
      .min(3, 'Name must be at least 3 characters')
      .max(30, 'Name must be at most 30 characters'),

    email: z.email('Invalid email address'),

    password: z
      .string('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      ),
  })
  .strict();

export const loginSchema = z
  .object({
    email: z.email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  })
  .strict();

export const sendInvitationForRegistrationSchema = z
  .object({
    email: z.email('Invalid email address'),
    role: z.enum(USER_ROLE).default(USER_ROLE.STAFF),
  })
  .strict();

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
export type SendInvitationForRegistrationDto = z.infer<
  typeof sendInvitationForRegistrationSchema
>;
