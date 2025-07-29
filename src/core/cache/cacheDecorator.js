import cache from '../../services/cache.service.js';
export const withCache = (fn, keyFn, ttl=60) => async (...args) => {
  const key = keyFn(...args);
  const hit = await cache.get(key);
  if (hit) return hit;
  const data = await fn(...args);
  await cache.set(key, data, ttl);
  return data;
};