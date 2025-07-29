import Joi from 'joi';

export const createSchema = Joi.object({
  name: Joi.string().min(2).max(191).required(),
  description: Joi.string().allow('', null).optional(),
  store_type_description: Joi.string().allow('', null).optional(),
  store_ui: Joi.string().allow('', null).optional(),
  zone_id: Joi.number().integer().positive().required(),
  title: Joi.string().min(1).max(191).optional(),
  sub_title: Joi.string().min(1).max(191).optional(),
  image: Joi.string().uri().allow('', null).optional(),
  offer: Joi.string().min(1).max(191).optional(),
  radius: Joi.number().precision(2).min(0).optional()
});

export const updateSchema = Joi.object({
  name: Joi.string().min(2).max(191),
  description: Joi.string().allow('', null),
  store_type_description: Joi.string().allow('', null),
  store_ui: Joi.string().allow('', null),
  zone_id: Joi.number().integer().positive(),
  title: Joi.string().min(1).max(191),
  sub_title: Joi.string().min(1).max(191),
  image: Joi.string().uri().allow('', null),
  offer: Joi.string().min(1).max(191),
  radius: Joi.number().precision(2).min(0)
});