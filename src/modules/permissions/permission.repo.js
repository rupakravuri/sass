import BaseRepository from '../../core/db/BaseRepository.js';
import db from '../../models/index.js';

class PermissionRepository extends BaseRepository {}
export default new PermissionRepository(db.Permission);