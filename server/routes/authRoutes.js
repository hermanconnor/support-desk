import express from 'express';
import { loginUser, getMe } from '../controllers/authController.js';
import authHandler from '../middleware/authHandler.js';

const router = express.Router();

router.post('/', loginUser);
router.get('/me', authHandler, getMe);

export default router;
