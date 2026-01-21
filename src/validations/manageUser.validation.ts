import Joi from 'joi';
import { status, TargetStatus, UserRole } from '../config/app.config';

export const addUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  number: Joi.string().min(10).max(15).required(),
  store: Joi.string().min(3).max(30).optional(),
  password: Joi.string().min(6).required(),
  designation: Joi.string()
    .valid(...Object.values(UserRole))
    .min(3)
    .max(30)
    .required(),
});

export const updateUserSchema = Joi.object({
  number: Joi.string().min(10).max(15).optional(),
  password: Joi.string().min(6).optional(),
  designation: Joi.string()
    .valid(...Object.values(UserRole))
    .min(3)
    .max(30)
    .optional(),
  status: Joi.string()
    .valid(...Object.values(status))
    .optional(),
});

export const getAllUsersSchema = Joi.object({
  page: Joi.number().min(1).optional(),
  limit: Joi.number().min(1).optional(),
  designation: Joi.string().optional(),
  number: Joi.string().optional(),
  name: Joi.string().optional(),
});

export const giveTargetSchema = Joi.object({
  userId: Joi.string().required(),
  amount: Joi.number().min(1).required(),
  endDate: Joi.date().required(),
  stateDate: Joi.date().required(),
});

export const updateTargetSchema = Joi.object({
  amount: Joi.number().min(1).optional(),
  endDate: Joi.date().optional(),
  status: Joi.string()
    .valid(...Object.values(TargetStatus))
    .optional(),
});

export const getAllTargetsSchema = Joi.object({
  page: Joi.number().min(1).optional(),
  limit: Joi.number().min(1).optional(),
  status: Joi.string()
    .valid(...Object.values(TargetStatus))
    .optional(),
  userId: Joi.string().optional(),
});
