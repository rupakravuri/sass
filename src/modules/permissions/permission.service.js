import permRepo from './permission.repo.js';

export const list = () => permRepo.findAll();
export const create = (payload) => permRepo.create(payload);
export const remove = (id) => permRepo.delete({ id });