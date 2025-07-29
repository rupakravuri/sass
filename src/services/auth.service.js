// src/services/auth.service.js
import db from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import ApiError from '../utils/ApiError.js';
import httpStatus from 'http-status';

export async function loginWithEmailPassword(email, password) {
  const user = await db.User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  const tokens = generateTokens(user);
  return { user: sanitize(user), tokens };
}

function generateTokens(user) {
  const payload = {
    id: user.id,
    email: user.email,
    roles: user.Roles ? user.Roles.map(role => role.name) : []
  };
  
  const token = jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  });
  
  return {
    access: {
      token,
      expires: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)) // 7 days
    }
  };
}

function sanitize(user) {
  const obj = user.toJSON();
  delete obj.password;
  return obj;
}
