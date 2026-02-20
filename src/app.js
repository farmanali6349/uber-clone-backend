import express from 'express';
import cors from 'cors';
// ROUTES
import { userRoute } from './routes/user.route.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ success: true, message: 'App is working super, duper fine' });
});

// Adding User Route
app.use('/users', userRoute);
export { app };
