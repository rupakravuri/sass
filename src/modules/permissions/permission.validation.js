import Joi from 'joi';

export const createPermissionSchema = Joi.object({
  name: Joi.string().max(150).required(),
  group: Joi.string().max(100).allow('')
});