import Joi from 'joi';

export const updateUserProfileSchema = Joi.object({
  userId: Joi.string().required(),
  name: Joi.string().min(2).max(100).optional(),
  address: Joi.string().min(10).max(200).optional(),
  number: Joi.string().min(10).max(15).optional(),
  profile: Joi.string().uri().optional(),
});

export const updateUserPasswordSchema = Joi.object({
  userId: Joi.string().required(),
  oldPassword: Joi.string().min(6).required(),
  newPassword: Joi.string().min(6).required(),
});

export const addNoteSchema = Joi.object({
  userId: Joi.string().required(),
  title: Joi.string().min(2).max(100).required(),
  content: Joi.string().min(10).max(500).required(),
});

export const updateNoteSchema = Joi.object({
  userId: Joi.string().required(),
  title: Joi.string().min(2).max(100).optional(),
  content: Joi.string().min(10).max(500).optional(),
});

export const getNotesSchema = Joi.object({
  userId: Joi.string().required(),
  page: Joi.number().min(1).optional(),
  limit: Joi.number().min(1).optional(),
});
