// src/routes/v1/auth.routes.js
import { Router } from 'express';
import validate from '../../middlewares/validate.js';
import { login } from '../../controllers/auth.controller.js';
import { loginSchema } from '../../validations/auth.validation.js';

const router = Router();

router.post('/login', validate({ body: loginSchema }), login);

export default router;
