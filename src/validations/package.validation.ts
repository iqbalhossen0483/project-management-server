import Joi from 'joi';

const packageSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  shortDescription: Joi.string().max(200).required(),
  description: Joi.string().required(),
  highlight: Joi.boolean().default(false),
  price: Joi.number().required(),
  features: Joi.array().items(Joi.string()).required(),
  totalUsers: Joi.number().required(),
  totalCustomers: Joi.number().required(),
  totalProducts: Joi.number().required(),
});

export default packageSchema;
