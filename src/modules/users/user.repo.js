import BaseRepository from '../../core/db/BaseRepository.js';
import db from '../../models/index.js';

class UserRepository extends BaseRepository {
  findWithRoles(where, opts = {}) {
    return this.model.findOne({ where, include: db.Role, ...opts });
  }
}

export default new UserRepository(db.User);