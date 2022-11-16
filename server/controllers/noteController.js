import User from '../models/User.js';
import Ticket from '../models/Ticket.js';
import Note from '../models/Note.js';

// @desc Get notes for a ticket
// @route GET /api/v1/tickets/:ticketId/notes
// @access Private
const getNotes = async (req, res) => {
  const user = await User.findById(req.user.userId).lean().exec();

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.ticketId).lean().exec();

  if (ticket.user.toString() !== req.user.userId) {
    res.status(403);
    throw new Error('Forbidden');
  }

  const notes = await Note.find({ ticket: req.params.ticketId }).lean().exec();

  res.status(200).json(notes);
};

// @desc Create ticket note
// @route POST /api/v1/tickets/:ticketId/notes
// @access Private
const addNote = async (req, res) => {
  const user = await User.findById(req.user.userId).lean().exec();

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.ticketId).lean().exec();

  if (ticket.user.toString() !== req.user.userId) {
    res.status(403);
    throw new Error('Forbidden');
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.user.userId,
  });

  res.status(201).json(note);
};

export { getNotes, addNote };
