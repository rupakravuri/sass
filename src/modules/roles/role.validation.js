import Joi from 'joi';

export const createRoleSchema = Joi.object({
  name: Joi.string().max(100).required(),
  description: Joi.string().max(255).allow('')
});

export const updateRoleSchema = Joi.object({
  name: Joi.string().max(100),
  description: Joi.string().max(255).allow('')
});

export const setPermsSchema = Joi.object({
  permissionIds: Joi.array().items(Joi.number().integer().positive()).required()
});