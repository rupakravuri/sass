import { Router } from 'express';
import { uploadSingle } from '../../libs/upload.js';

const router = Router();

router.post('/upload', uploadSingle('image', 'images'), (req, res) => {
  res.json({ url: req.file.url, key: req.file.key });
});

export default router;