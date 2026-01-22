import mongoose from 'mongoose';
import z from 'zod';
import { PROJECT_STATUS } from '../types/common';

export const createProjectSchema = z
  .object({
    name: z
      .string('Name is required')
      .min(3, 'Name must be at least 3 characters')
      .max(30, 'Name must be at most 30 characters'),

    description: z
      .string('Description is required')
      .min(3, 'Description must be at least 3 characters')
      .max(300, 'Description must be at most 100 characters'),
    status: z.enum(PROJECT_STATUS).default(PROJECT_STATUS.ACTIVE),
    createdBy: z
      .string('createdBy is required')
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid user id',
      }),
  })
  .strict();

export type CreateProjectSchema = z.infer<typeof createProjectSchema>;
