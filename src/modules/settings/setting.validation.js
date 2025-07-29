import Joi from 'joi';

// White-list keys you allow to be changed from admin UI
export const allowedKeys = [
  'delivery_charge_type','delivery_charges','base_delivery_charge','base_delivery_distance',
  'extra_delivery_charge','extra_delivery_distance','orderIdPrefix','orderIdSuffix',
  'platformFee','enableDunzoDelivery', 'tips', 'tips_percentage',
  // ...add as needed
];

export const bulkUpdateSchema = Joi.object().pattern(Joi.string().valid(...allowedKeys), Joi.any());