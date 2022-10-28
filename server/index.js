import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import 'express-async-errors';
import errorHandler from './middleware/errorHandler.js';
import userRoutes from './routes/userRoutes.js';

const PORT = process.env.PORT || 5000;
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use('/api/v1/users', userRoutes);

// ERROR HANDLER
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
