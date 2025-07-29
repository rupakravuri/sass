import BaseRepository from '../../core/db/BaseRepository.js';
import db from '../../models/index.js';

class RoleRepository extends BaseRepository {
  findWithPerms(where = {}, opts = {}) {
    return this.model.findOne({ where, include: db.Permission, ...opts });
  }
}
export default new RoleRepository(db.Role);