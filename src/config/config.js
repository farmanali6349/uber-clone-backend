import 'dotenv/config.js';

const PORT = process.env.PORT;

if (!PORT) {
  throw new Error('PORT is not available');
}

export { PORT };
