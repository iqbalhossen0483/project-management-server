import Joi from 'joi';

export const storeSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  owner: Joi.string().required(),
  title: Joi.string().min(3).max(100).required(),
  location: Joi.string().min(3).max(100).required(),
  primaryNumber: Joi.string().min(10).max(15).required(),
  secondaryNumber: Joi.string().min(10).max(15).optional(),
});

export const updateStoreSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  location: Joi.string().min(3).max(100).optional(),
  primaryNumber: Joi.string().min(10).max(15).optional(),
  secondaryNumber: Joi.string().min(10).max(15).optional(),
});

export const getStoreSchema = Joi.object({
  page: Joi.string().optional(),
  limit: Joi.string().optional(),
  name: Joi.string().optional(),
  title: Joi.string().optional(),
  primaryNumber: Joi.string().optional(),
});

export const updateStoreStatus = Joi.object({
  status: Joi.string().valid('active', 'inactive').required(),
});

export const purchaseStoreSchema = Joi.object({
  packageId: Joi.string().required(),
});
