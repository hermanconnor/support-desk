import Ticket from '../models/Ticket.js';
import User from '../models/User.js';

// @desc Get all user tickets
// @route GET /api/v1/tickets
// @access Private
const getTickets = async (req, res) => {
  const user = await User.findById(req.user.userId).lean().exec();

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const tickets = await Ticket.find({ user: req.user.userId }).lean().exec();

  res.status(200).json(tickets);
};

// @desc Get user ticket
// @route GET /api/v1/tickets/:id
// @access Private
const getTicket = async (req, res) => {
  const user = await User.findById(req.user.userId).lean().exec();

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.id).lean().exec();

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== req.user.userId) {
    res.status(403);
    throw new Error('Forbidden');
  }

  res.status(200).json(ticket);
};

// @desc Get user tickets
// @route POST /api/v1/tickets
// @access Private
const createTicket = async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error('Please add a product and description');
  }

  const user = await User.findById(req.user.userId).lean().exec();

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: user._id,
  });

  res.status(201).json(ticket);
};

// @desc Update user ticket
// @route PATCH /api/v1/tickets/:id
// @access Private
const updateTicket = async (req, res) => {
  const user = await User.findById(req.user.userId).lean().exec();

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.id).exec();

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== user._id.toString()) {
    res.status(403);
    throw new Error('Forbidden');
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
  );

  res.status(200).json(updatedTicket);
};

// @desc Delete user ticket
// @route DELETE /api/v1/tickets/:id
// @access Private
const deleteTicket = async (req, res) => {
  const user = await User.findById(req.user.userId).lean().exec();

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.id).exec();

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== user._id.toString()) {
    res.status(403);
    throw new Error('Forbidden');
  }

  await ticket.remove();

  res.status(200).json({ success: true });
};

export { getTickets, createTicket, getTicket, updateTicket, deleteTicket };
