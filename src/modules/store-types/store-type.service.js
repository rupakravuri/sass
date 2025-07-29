import repo from './store-type.repo.js';
import zoneRepo from '../zones/zone.repo.js';
import ApiError from '../../utils/ApiError.js';
import httpStatus from 'http-status';

export const list = (where = {}, opts = {}) => repo.findWithZone(where, opts);

export const get = async (id) => {
  const storeType = await repo.findByIdWithZone(id);
  if (!storeType) throw new ApiError(httpStatus.NOT_FOUND, 'Store type not found');
  return storeType;
};

export const getByZone = async (zoneId) => {
  // Check if zone exists
  const zone = await zoneRepo.findById(zoneId);
  if (!zone) throw new ApiError(httpStatus.NOT_FOUND, 'Zone not found');
  
  return repo.findByZoneId(zoneId);
};

export const create = async (payload) => {
  // Check if zone exists
  const zone = await zoneRepo.findById(payload.zone_id);
  if (!zone) throw new ApiError(httpStatus.NOT_FOUND, 'Zone not found');
  
  return repo.create(payload);
};

export const update = async (id, payload) => {
  // Check if store type exists
  const storeType = await repo.findById(id);
  if (!storeType) throw new ApiError(httpStatus.NOT_FOUND, 'Store type not found');

  // Check if zone exists (if zone_id is being updated)
  if (payload.zone_id) {
    const zone = await zoneRepo.findById(payload.zone_id);
    if (!zone) throw new ApiError(httpStatus.NOT_FOUND, 'Zone not found');
  }

  await repo.update(payload, { id });
  return get(id);
};

export const remove = async (id) => {
  const storeType = await repo.findById(id);
  if (!storeType) throw new ApiError(httpStatus.NOT_FOUND, 'Store type not found');
  
  return repo.delete({ id });
};