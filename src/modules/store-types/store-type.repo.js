import BaseRepository from '../../core/db/BaseRepository.js';
import db from '../../models/index.js';

class StoreTypeRepository extends BaseRepository {
  findWithZone(where = {}, opts = {}) {
    return this.model.findAll({ 
      where, 
      include: [{
        model: db.Zone,
        as: 'zone'
      }], 
      ...opts 
    });
  }

  findByIdWithZone(id, opts = {}) {
    return this.model.findByPk(id, {
      include: [{
        model: db.Zone,
        as: 'zone'
      }],
      ...opts
    });
  }

  findByZoneId(zoneId, opts = {}) {
    return this.model.findAll({
      where: { zone_id: zoneId },
      include: [{
        model: db.Zone,
        as: 'zone'
      }],
      ...opts
    });
  }
}

export default new StoreTypeRepository(db.StoreType);