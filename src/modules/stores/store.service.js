import repo from './store.repo.js';
import storeTypeRepo from '../store-types/store-type.repo.js';
import zoneRepo from '../zones/zone.repo.js';
import ApiError from '../../utils/ApiError.js';
import httpStatus from 'http-status';

export const list = (filters = {}, opts = {}) => {
  const where = {};
  
  // Apply filters
  if (filters.store_type_id) where.store_type_id = filters.store_type_id;
  if (filters.zone_id) where.zone_id = filters.zone_id;
  if (filters.is_active !== undefined) where.is_active = filters.is_active;
  if (filters.is_featured !== undefined) where.is_featured = filters.is_featured;
  if (filters.is_accepted !== undefined) where.is_accepted = filters.is_accepted;
  if (filters.city) where.city = filters.city;
  if (filters.state) where.state = filters.state;
  
  return repo.findWithRelations(where, opts);
};

export const get = async (id) => {
  const store = await repo.findByIdWithRelations(id);
  if (!store) throw new ApiError(httpStatus.NOT_FOUND, 'Store not found');
  return store;
};

export const getByStoreType = async (storeTypeId) => {
  // Check if store type exists
  const storeType = await storeTypeRepo.findById(storeTypeId);
  if (!storeType) throw new ApiError(httpStatus.NOT_FOUND, 'Store type not found');
  
  return repo.findByStoreTypeId(storeTypeId);
};

export const getByZone = async (zoneId) => {
  // Check if zone exists
  const zone = await zoneRepo.findById(zoneId);
  if (!zone) throw new ApiError(httpStatus.NOT_FOUND, 'Zone not found');
  
  return repo.findByZoneId(zoneId);
};

export const getActive = () => repo.findActive();

export const getFeatured = () => repo.findFeatured();

export const create = async (payload) => {
  // Validate store type exists
  if (payload.store_type_id) {
    const storeType = await storeTypeRepo.findById(payload.store_type_id);
    if (!storeType) throw new ApiError(httpStatus.NOT_FOUND, 'Store type not found');
  }
  
  // Validate zone exists
  if (payload.zone_id) {
    const zone = await zoneRepo.findById(payload.zone_id);
    if (!zone) throw new ApiError(httpStatus.NOT_FOUND, 'Zone not found');
  }
  
  // Check if SKU already exists
  const existingStore = await repo.findOne({ sku: payload.sku });
  if (existingStore) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Store SKU already exists');
  }
  
  return repo.create(payload);
};

export const update = async (id, payload) => {
  // Check if store exists
  const store = await repo.findById(id);
  if (!store) throw new ApiError(httpStatus.NOT_FOUND, 'Store not found');

  // Validate store type exists (if being updated)
  if (payload.store_type_id) {
    const storeType = await storeTypeRepo.findById(payload.store_type_id);
    if (!storeType) throw new ApiError(httpStatus.NOT_FOUND, 'Store type not found');
  }
  
  // Validate zone exists (if being updated)
  if (payload.zone_id) {
    const zone = await zoneRepo.findById(payload.zone_id);
    if (!zone) throw new ApiError(httpStatus.NOT_FOUND, 'Zone not found');
  }

  // Check if SKU is being updated and already exists
  if (payload.sku && payload.sku !== store.sku) {
    const existingStore = await repo.findOne({ sku: payload.sku });
    if (existingStore && existingStore.id !== id) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Store SKU already exists');
    }
  }

  await repo.update(payload, { id });
  return get(id);
};

export const remove = async (id) => {
  const store = await repo.findById(id);
  if (!store) throw new ApiError(httpStatus.NOT_FOUND, 'Store not found');
  
  return repo.delete({ id });
};