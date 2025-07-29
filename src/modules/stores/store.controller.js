import BaseController from '../../core/http/BaseController.js';
import catchAsync from '../../utils/catchAsync.js';
import * as svc from './store.service.js';

class StoreController extends BaseController {
  index = catchAsync(async (req, res) => { 
    const filters = {
      store_type_id: req.query.store_type_id,
      zone_id: req.query.zone_id,
      is_active: req.query.is_active !== undefined ? req.query.is_active === 'true' : undefined,
      is_featured: req.query.is_featured !== undefined ? req.query.is_featured === 'true' : undefined,
      is_accepted: req.query.is_accepted !== undefined ? req.query.is_accepted === 'true' : undefined,
      city: req.query.city,
      state: req.query.state
    };
    
    // Remove undefined values
    Object.keys(filters).forEach(key => filters[key] === undefined && delete filters[key]);
    
    this.ok(res, await svc.list(filters)); 
  });

  show = catchAsync(async (req, res) => { 
    this.ok(res, await svc.get(req.params.id)); 
  });

  active = catchAsync(async (req, res) => { 
    this.ok(res, await svc.getActive()); 
  });

  featured = catchAsync(async (req, res) => { 
    this.ok(res, await svc.getFeatured()); 
  });

  create = catchAsync(async (req, res) => { 
    // Handle image upload if present
    if (req.file) {
      req.body.image = req.file.url;
    }
    
    // Generate slug from name if not provided
    if (!req.body.slug && req.body.name) {
      req.body.slug = req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    
    this.created(res, await svc.create(req.body)); 
  });

  update = catchAsync(async (req, res) => { 
    // Handle image upload if present
    if (req.file) {
      req.body.image = req.file.url;
    }
    
    // Generate slug from name if not provided but name is being updated
    if (!req.body.slug && req.body.name) {
      req.body.slug = req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    
    this.ok(res, await svc.update(req.params.id, req.body)); 
  });

  remove = catchAsync(async (req, res) => { 
    await svc.remove(req.params.id); 
    this.ok(res, { deleted: true }); 
  });
}

export default new StoreController();