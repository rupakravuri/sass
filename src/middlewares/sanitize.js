// src/middlewares/sanitize.js
import xss from 'xss';
const deepSanitize = (v) => {
  if (typeof v === 'string') return xss(v);
  if (Array.isArray(v)) return v.map(deepSanitize);
  if (v && typeof v === 'object') {
    return Object.fromEntries(Object.entries(v).map(([k, val]) => [k, deepSanitize(val)]));
  }
  return v;
};

export default () => (req, _res, next) => {
  if (req.body)  req.body  = deepSanitize(req.body);
  if (req.query) req.query = deepSanitize(req.query);
  if (req.params) req.params = deepSanitize(req.params);
  next();
};
