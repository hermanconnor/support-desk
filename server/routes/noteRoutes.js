import express from 'express';
import authHandler from '../middleware/authHandler.js';
import { getNotes, addNote } from '../controllers/noteController.js';

const router = express.Router({ mergeParams: true });

router.route('/').get(authHandler, getNotes).post(authHandler, addNote);

export default router;
