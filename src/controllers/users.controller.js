import catchAsync from '../utils/catchAsync.js';
import * as userService from '../services/users.service.js';

export const getMe = catchAsync(async (req, res) => {
  res.json(req.user);
});

export const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
});