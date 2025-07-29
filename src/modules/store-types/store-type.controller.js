import BaseController from '../../core/http/BaseController.js';
import catchAsync from '../../utils/catchAsync.js';
import * as svc from './store-type.service.js';

class StoreTypeController extends BaseController {
  index = catchAsync(async (req, res) => { 
    const { zone_id } = req.query;
    if (zone_id) {
      this.ok(res, await svc.getByZone(zone_id));
    } else {
      this.ok(res, await svc.list());
    }
  });

  show = catchAsync(async (req, res) => { 
    this.ok(res, await svc.get(req.params.id)); 
  });

  create = catchAsync(async (req, res) => { 
    // Handle image upload if present
    if (req.file) {
      req.body.image = req.file.url;
    }
    this.created(res, await svc.create(req.body)); 
  });

  update = catchAsync(async (req, res) => { 
    // Handle image upload if present
    if (req.file) {
      req.body.image = req.file.url;
    }
    this.ok(res, await svc.update(req.params.id, req.body)); 
  });

  remove = catchAsync(async (req, res) => { 
    await svc.remove(req.params.id); 
    this.ok(res, { deleted: true }); 
  });
}

export default new StoreTypeController();