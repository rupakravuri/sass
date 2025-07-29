import BaseController from '../../core/http/BaseController.js';
import catchAsync from '../../utils/catchAsync.js';
import * as svc from './permission.service.js';

class PermissionController extends BaseController {
  index = catchAsync(async (req, res) => this.ok(res, await svc.list()));
  create = catchAsync(async (req, res) => this.created(res, await svc.create(req.body)));
  remove = catchAsync(async (req, res) => { await svc.remove(req.params.id); this.ok(res, { deleted: true }); });
}
export default new PermissionController();