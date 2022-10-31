import Ticket from '../models/Ticket.js';
import User from '../models/User.js';

// @desc Get user tickets
// @route GET /api/v1/tickets
// @access Private
const getTickets = async (req, res) => {
  res.status(200).json({ message: 'Get Tickets' });
};

// @desc Get user tickets
// @route POST /api/v1/tickets
// @access Private
const createTicket = async (req, res) => {
  res.status(200).json({ message: 'Create Ticket' });
};

export { getTickets, createTicket };
