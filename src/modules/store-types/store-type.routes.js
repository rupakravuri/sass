import { Router } from 'express';
import auth from '../../middlewares/auth.js';
import validate from '../../middlewares/validate.js';
import { uploadSingle } from '../../middlewares/upload.js';
import controller from './store-type.controller.js';
import { createSchema, updateSchema } from './store-type.validation.js';

const router = Router();

router.get('/', auth(['admin', 'manager']), controller.index);
router.get('/:id', auth(['admin', 'manager']), controller.show);
router.post('/', 
  auth(['admin']), 
  ...uploadSingle('image', 'store-types'),
  validate(createSchema), 
  controller.create
);
router.put('/:id', 
  auth(['admin']), 
  ...uploadSingle('image', 'store-types'),
  validate(updateSchema), 
  controller.update
);
router.delete('/:id', auth(['admin']), controller.remove);

export default router;