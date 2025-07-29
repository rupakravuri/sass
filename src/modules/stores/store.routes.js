import { Router } from 'express';
import auth from '../../middlewares/auth.js';
import validate from '../../middlewares/validate.js';
import { uploadSingle } from '../../middlewares/upload.js';
import controller from './store.controller.js';
import { createSchema, updateSchema } from './store.validation.js';

const router = Router();

// Public/readable endpoints (require auth but lower permissions)
router.get('/', auth(['admin', 'manager']), controller.index);
router.get('/active', auth(['admin', 'manager']), controller.active);
router.get('/featured', auth(['admin', 'manager']), controller.featured);
router.get('/:id', auth(['admin', 'manager']), controller.show);

// Admin-only endpoints
router.post('/', 
  auth(['admin']), 
  ...uploadSingle('image', 'stores'),
  validate(createSchema), 
  controller.create
);
router.put('/:id', 
  auth(['admin']), 
  ...uploadSingle('image', 'stores'),
  validate(updateSchema), 
  controller.update
);
router.delete('/:id', auth(['admin']), controller.remove);

export default router;