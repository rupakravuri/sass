import repo from './user.repo.js';
import ApiError from '../../utils/ApiError.js';
import httpStatus from 'http-status';

export const list = (where = {}, opts = {}) => repo.findAll(where, opts);

export const get = async (id) => {
  const u = await repo.findById(id);
  if (!u) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  return sanitize(u);
};

export const getByEmail = (email) => repo.findWithRoles({ email });

export const create = async (payload) => sanitize(await repo.create(payload));

export const update = async (id, payload) => {
  await repo.update(payload, { id });
  return get(id);
};

export const remove = (id) => repo.delete({ id });

function sanitize(user) {
  const obj = user.toJSON();
  delete obj.password;
  return obj;
}