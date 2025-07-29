import Joi from 'joi';

export const createSchema = Joi.object({
  name: Joi.string().min(2).max(191).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().optional(),
  role: Joi.string().optional()
});

export const updateSchema = Joi.object({
  name: Joi.string().min(2).max(191),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  phone: Joi.string(),
  role: Joi.string()
});