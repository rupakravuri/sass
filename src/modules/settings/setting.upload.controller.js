import sharp from 'sharp';
import { uploadSingle } from '../../libs/upload.js';
import * as settingService from './setting.service.js';

export const uploadSettingImage = (key, sizes=[]) => [
  uploadSingle('image', `settings/${key}`),
  async (req, res, next) => {
    if (!req.file) return res.status(400).json({ message: 'image required' });
    const variants = {};
    for (const s of sizes) {
      const buf = await sharp(req.file.buffer).resize(s.w, s.h).toBuffer();
      const newKey = `settings/${key}/${s.w}x${s.h}-${Date.now()}.png`;
      variants[`${s.w}x${s.h}`] = await uploadBuffer(buf, newKey, 'image/png');
    }
    await settingService.saveMany({ [key]: variants });
    await settingService.clearCache();
    res.json({ key, variants });
  }
];