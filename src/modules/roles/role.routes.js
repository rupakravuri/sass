import { Router } from 'express';
import auth from '../../middlewares/auth.js';
import validate from '../../middlewares/validate.js';
import controller from './role.controller.js';
import { createRoleSchema, updateRoleSchema, setPermsSchema } from './role.validation.js';

const router = Router();

router.get('/', auth(['admin']), controller.index);
router.get('/:id', auth(['admin']), controller.show);
router.post('/', auth(['admin']), validate(createRoleSchema), controller.create);
router.put('/:id', auth(['admin']), validate(updateRoleSchema), controller.update);
router.delete('/:id', auth(['admin']), controller.remove);
router.post('/:id/permissions', auth(['admin']), validate(setPermsSchema), controller.setPermissions);

export default router;