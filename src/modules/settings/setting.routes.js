import { Router } from 'express';
import auth from '../../middlewares/auth.js';
import validate from '../../middlewares/validate.js';
import { bulkUpdateSchema } from './setting.validation.js';
import controller from './setting.controller.js';

const router = Router();

router.get('/', auth('manageSettings'), controller.getAll);
router.get('/:key', auth('manageSettings'), controller.getOne);
router.patch('/', auth('manageSettings'), validate(bulkUpdateSchema), controller.updateBulk);
router.post('/cache/clear', auth('manageSettings'), controller.clearCache);

export default router;