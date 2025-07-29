import { Router } from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from '../../modules/users/user.routes.js';   // <- keep this one
import roleRoutes from '../../modules/roles/role.routes.js';   // example
import settingRoutes from '../../modules/settings/setting.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/roles', roleRoutes);
router.use('/settings', settingRoutes);

export default router;
