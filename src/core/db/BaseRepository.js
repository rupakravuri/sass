export default class BaseRepository {
  constructor(model) { this.model = model; }
  findById(id, opts)     { return this.model.findByPk(id, opts); }
  findOne(where, opts)   { return this.model.findOne({ where, ...opts }); }
  findAll(where, opts)   { return this.model.findAll({ where, ...opts }); }
  create(data, opts)     { return this.model.create(data, opts); }
  update(data, where)    { return this.model.update(data, { where }); }
  delete(where)          { return this.model.destroy({ where }); }
}