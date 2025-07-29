import BaseRepository from '../../core/db/BaseRepository.js';
import db from '../../models/index.js';

class SettingRepository extends BaseRepository {
  async upsertMany(kvPairs, { transaction } = {}) {
    const ops = Object.entries(kvPairs).map(([key, { value, type }]) => ({ key, value, type }));
    return db.Setting.bulkCreate(ops, { updateOnDuplicate: ['value','type'], transaction });
  }
}

export default new SettingRepository(db.Setting);