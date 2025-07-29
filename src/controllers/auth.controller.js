import catchAsync from '../utils/catchAsync.js';
import * as authService from '../services/auth.service.js';

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const data = await authService.loginWithEmailPassword(email, password);
  res.json(data);
});
