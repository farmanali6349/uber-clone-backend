import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/config.js';

const generateAuthToken = data => {
  return jwt.sign(data, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN || '24h',
  });
};

const comparePassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

const generateHash = async password => {
  try {
    return await bcrypt.hash(password, 12);
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

export { generateHash, generateAuthToken, comparePassword };
