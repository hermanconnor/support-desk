import express from 'express';
import authHandler from '../middleware/authHandler.js';
import { getTickets, createTicket } from '../controllers/ticketController.js';

const router = express.Router();

router.route('/').get(authHandler, getTickets).post(authHandler, createTicket);

export default router;
