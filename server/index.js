import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import 'express-async-errors';
import 'colors';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';
import userRoutes from './routes/userRoutes.js';

const PORT = process.env.PORT || 5000;
const app = express();

// DATABASE CONNECTION
connectDB();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use('/api/v1/users', userRoutes);

// ERROR HANDLER
app.use(errorHandler);

// START SERVER
mongoose.connection.once('open', () => {
  console.log(
    `Connected to MongoDB: ${mongoose.connection.host}`.cyan.underline,
  );
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
