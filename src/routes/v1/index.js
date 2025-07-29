import { Router } from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from '../../modules/users/user.routes.js';   // <- keep this one
import roleRoutes from '../../modules/roles/role.routes.js';   // example
import settingRoutes from '../../modules/settings/setting.routes.js';
import zoneRoutes from '../../modules/zones/zone.routes.js';
import storeTypeRoutes from '../../modules/store-types/store-type.routes.js';
import storeRoutes from '../../modules/stores/store.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/roles', roleRoutes);
router.use('/settings', settingRoutes);
router.use('/zones', zoneRoutes);
router.use('/store-types', storeTypeRoutes);

export default router;
