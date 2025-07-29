import { Router } from 'express';
import auth from '../../middlewares/auth.js';
import validate from '../../middlewares/validate.js';
import controller from './user.controller.js';
import { createSchema, updateSchema } from './user.validation.js';

const router = Router();

router.get('/me', auth(), controller.me);
router.get('/', auth(['admin','manager']), controller.index);
router.get('/:id', auth(['admin','manager']), controller.show);
router.post('/', auth(['admin']), validate(createSchema), controller.create);
router.put('/:id', auth(['admin']), validate(updateSchema), controller.update);
router.delete('/:id', auth(['admin']), controller.remove);

export default router;