import 'dotenv/config.js';

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

if (!PORT) {
  throw new Error('PORT is missing.');
}

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is missing.');
}

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is missing.');
}

export { PORT, DATABASE_URL, JWT_SECRET, JWT_EXPIRES_IN };
