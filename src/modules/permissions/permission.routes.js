import { Router } from 'express';
import auth from '../../middlewares/auth.js';
import validate from '../../middlewares/validate.js';
import controller from './permission.controller.js';
import { createPermissionSchema } from './permission.validation.js';

const router = Router();

router.get('/', auth(['admin']), controller.index);
router.post('/', auth(['admin']), validate(createPermissionSchema), controller.create);
router.delete('/:id', auth(['admin']), controller.remove);

export default router;