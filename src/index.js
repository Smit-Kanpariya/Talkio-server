import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import { connectDB } from './lib/db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // allow to extract json data from body
app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:5173', // Ensure no trailing slash
    credentials: true, // Allow cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);

app.listen(PORT, () => {
  console.log('Server is running on port :' + PORT);
  connectDB();
});
