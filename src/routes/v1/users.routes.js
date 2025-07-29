import { Router } from 'express';
import auth from '../../middlewares/auth.js';
import * as userCtrl from '../../controllers/users.controller.js';

const router = Router();

router.get('/me', auth(), userCtrl.getMe);
router.post('/', auth('manageUsers'), userCtrl.createUser);

export default router;