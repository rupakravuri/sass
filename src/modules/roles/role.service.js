import roleRepo from './role.repo.js';
import db from '../../models/index.js';

export const list = () => roleRepo.findAll({}, { include: db.Permission });
export const get = (id) => roleRepo.findById(id, { include: db.Permission });
export const create = (payload) => roleRepo.create(payload);
export const update = async (id, payload) => { await roleRepo.update(payload, { id }); return get(id); };
export const remove = (id) => roleRepo.delete({ id });
export const setPermissions = async (roleId, permissionIds = []) => {
  const role = await db.Role.findByPk(roleId);
  await role.setPermissions(permissionIds);
  return role.reload({ include: db.Permission });
};