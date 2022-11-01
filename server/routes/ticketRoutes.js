import express from 'express';
import authHandler from '../middleware/authHandler.js';
import validateObjectId from '../middleware/validateObjectId.js';
import {
  getTickets,
  createTicket,
  getTicket,
  updateTicket,
  deleteTicket,
} from '../controllers/ticketController.js';

const router = express.Router();

router.route('/').get(authHandler, getTickets).post(authHandler, createTicket);

router
  .route('/:id')
  .get(authHandler, validateObjectId, getTicket)
  .patch(authHandler, updateTicket)
  .delete(authHandler, deleteTicket);

export default router;
