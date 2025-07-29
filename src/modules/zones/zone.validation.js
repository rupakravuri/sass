import Joi from 'joi';

export const createSchema = Joi.object({
  name: Joi.string().min(2).max(191).required(),
  description: Joi.string().allow('', null).optional()
});

export const updateSchema = Joi.object({
  name: Joi.string().min(2).max(191),
  description: Joi.string().allow('', null)
});