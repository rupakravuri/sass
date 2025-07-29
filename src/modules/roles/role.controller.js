import BaseController from '../../core/http/BaseController.js';
import catchAsync from '../../utils/catchAsync.js';
import * as svc from './role.service.js';

class RoleController extends BaseController {
  index = catchAsync(async (req, res) => this.ok(res, await svc.list()));
  show = catchAsync(async (req, res) => this.ok(res, await svc.get(req.params.id)));
  create = catchAsync(async (req, res) => this.created(res, await svc.create(req.body)));
  update = catchAsync(async (req, res) => this.ok(res, await svc.update(req.params.id, req.body)));
  remove = catchAsync(async (req, res) => { await svc.remove(req.params.id); this.ok(res, { deleted: true }); });
  setPermissions = catchAsync(async (req, res) => this.ok(res, await svc.setPermissions(req.params.id, req.body.permissionIds)));
}
export default new RoleController();