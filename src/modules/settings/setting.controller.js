import BaseController from '../../core/http/BaseController.js';
import catchAsync from '../../utils/catchAsync.js';
import * as settingService from './setting.service.js';

class SettingController extends BaseController {
  getAll = catchAsync(async (req, res) => {
    const settings = await settingService.getAll();
    this.ok(res, settings);
  });

  getOne = catchAsync(async (req, res) => {
    const value = await settingService.getByKey(req.params.key);
    this.ok(res, { key: req.params.key, value });
  });

  updateBulk = catchAsync(async (req, res) => {
    await settingService.saveMany(req.body);
    await settingService.clearCache();
    this.ok(res, { updated: Object.keys(req.body).length });
  });

  clearCache = catchAsync(async (req, res) => {
    await settingService.clearCache();
    this.ok(res, { cleared: true });
  });
}

export default new SettingController();