import BaseRepository from '../../core/db/BaseRepository.js';
import db from '../../models/index.js';

class StoreRepository extends BaseRepository {
  findWithRelations(where = {}, opts = {}) {
    return this.model.findAll({ 
      where, 
      include: [
        {
          model: db.StoreType,
          as: 'store_type'
        },
        {
          model: db.Zone,
          as: 'zone'
        }
      ], 
      ...opts 
    });
  }

  findByIdWithRelations(id, opts = {}) {
    return this.model.findByPk(id, {
      include: [
        {
          model: db.StoreType,
          as: 'store_type'
        },
        {
          model: db.Zone,
          as: 'zone'
        }
      ],
      ...opts
    });
  }

  findByStoreTypeId(storeTypeId, opts = {}) {
    return this.model.findAll({
      where: { store_type_id: storeTypeId },
      include: [
        {
          model: db.StoreType,
          as: 'store_type'
        },
        {
          model: db.Zone,
          as: 'zone'
        }
      ],
      ...opts
    });
  }

  findByZoneId(zoneId, opts = {}) {
    return this.model.findAll({
      where: { zone_id: zoneId },
      include: [
        {
          model: db.StoreType,
          as: 'store_type'
        },
        {
          model: db.Zone,
          as: 'zone'
        }
      ],
      ...opts
    });
  }

  findActive(opts = {}) {
    return this.findWithRelations({ is_active: true }, opts);
  }

  findFeatured(opts = {}) {
    return this.findWithRelations({ is_featured: true }, opts);
  }
}

export default new StoreRepository(db.Store);