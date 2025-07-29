// src/middlewares/validate.js
import ApiError from '../utils/ApiError.js';
import httpStatus from 'http-status';

export default (schema) => (req, res, next) => {
  // Allow either a single Joi schema (assume body) or { body, query, params }
  const wrap = schema.body || schema.query || schema.params ? schema : { body: schema };
  const opts = { abortEarly: false, stripUnknown: true };

  try {
    if (wrap.body) {
      const { value, error } = wrap.body.validate(req.body, opts);
      if (error) throw error;
      req.body = value;
    }
    if (wrap.query) {
      const { value, error } = wrap.query.validate(req.query, opts);
      if (error) throw error;
      req.query = value;
    }
    if (wrap.params) {
      const { value, error } = wrap.params.validate(req.params, opts);
      if (error) throw error;
      req.params = value;
    }
    next();
  } catch (err) {
    next(new ApiError(
      httpStatus.BAD_REQUEST,
      err.details?.map(d => d.message).join(', ') || err.message
    ));
  }
};
