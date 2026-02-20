import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// ROUTES
import { userRoute } from './routes/user.route.js';
import { CORS_ORIGIN } from './config/config.js';
import { notFound } from './middlewares/notFound.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';
const app = express();

app.use(
  cors({
    origin: CORS_ORIGIN,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ success: true, message: 'App is working super, duper fine' });
});

// Adding User Route
app.use('/users', userRoute);

// 404 Handler
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

export { app };
