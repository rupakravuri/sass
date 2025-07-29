// src/services/auth.service.js
import db from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import ApiError from '../utils/ApiError.js';
import httpStatus from 'http-status';

export async function loginWithEmailPassword(email, password) {
  const user = await db.User.findOne({ where: { email }, include: db.Role });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  const tokens = generateTokens(user);
  return { user: sanitize(user), tokens };
}
