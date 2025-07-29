import BaseRepository from '../../core/db/BaseRepository.js';
import db from '../../models/index.js';

class ZoneRepository extends BaseRepository {
  findWithStoreTypes(where = {}, opts = {}) {
    return this.model.findAll({ 
      where, 
      include: [{
        model: db.StoreType,
        as: 'store_types'
      }], 
      ...opts 
    });
  }

  findByIdWithStoreTypes(id, opts = {}) {
    return this.model.findByPk(id, {
      include: [{
        model: db.StoreType,
        as: 'store_types'
      }],
      ...opts
    });
  }
}

export default new ZoneRepository(db.Zone);