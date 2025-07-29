import repo from './zone.repo.js';
import ApiError from '../../utils/ApiError.js';
import httpStatus from 'http-status';

export const list = (where = {}, opts = {}) => repo.findWithStoreTypes(where, opts);

export const get = async (id) => {
  const zone = await repo.findByIdWithStoreTypes(id);
  if (!zone) throw new ApiError(httpStatus.NOT_FOUND, 'Zone not found');
  return zone;
};

export const create = async (payload) => {
  // Check if zone name already exists
  const existingZone = await repo.findOne({ name: payload.name });
  if (existingZone) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Zone name already exists');
  }
  
  return repo.create(payload);
};

export const update = async (id, payload) => {
  // Check if zone exists
  const zone = await repo.findById(id);
  if (!zone) throw new ApiError(httpStatus.NOT_FOUND, 'Zone not found');

  // Check if name is being updated and already exists
  if (payload.name && payload.name !== zone.name) {
    const existingZone = await repo.findOne({ name: payload.name });
    if (existingZone && existingZone.id !== id) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Zone name already exists');
    }
  }

  await repo.update(payload, { id });
  return get(id);
};

export const remove = async (id) => {
  const zone = await repo.findById(id);
  if (!zone) throw new ApiError(httpStatus.NOT_FOUND, 'Zone not found');
  
  return repo.delete({ id });
};