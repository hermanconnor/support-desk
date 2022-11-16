import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlus } from 'react-icons/fa';
import Modal from 'react-modal';
import { toast } from 'react-toastify';

import { getTicket, closeTicket } from '../features/tickets/ticketSlice';
import { getNotes, createNote } from '../features/notes/noteSlice';
import NoteItem from '../components/NoteItem';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%,-50%)',
    position: 'relative',
  },
};

Modal.setAppElement('#root');

const Ticket = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [noteText, setNoteText] = useState('');

  const { ticketId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ticket, isLoading, isError, message } = useSelector(
    (state) => state.tickets,
  );
  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes,
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
  }, [dispatch, isError, message, ticketId]);

  const handleClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success('Ticket Closed');
    navigate('/tickets');
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleNoteSubmit = (e) => {
    e.preventDefault();

    dispatch(createNote({ noteText, ticketId }));

    closeModal();
  };

  if (isLoading || notesIsLoading) return <Spinner />;

  if (isError) return <h3>Something Went Wrong</h3>;

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url='/tickets' />

        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>

        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
        </h3>

        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>

        <h2>Notes</h2>
      </header>

      {ticket.status !== 'closed' && (
        <button className='btn' onClick={openModal}>
          <FaPlus /> Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={closeModal}
        contentLabel='Add Note'
      >
        <h2>Add Note</h2>
        <button className='btn-close' onClick={closeModal}>
          X
        </button>
        <form onSubmit={handleNoteSubmit}>
          <div className='form-group'>
            <textarea
              name='noteText'
              id='noteText'
              className='form-control'
              placeholder='Note text'
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>

          <div className='form-group'>
            <button type='submit' className='btn'>
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}

      {ticket.status !== 'closed' && (
        <button className='btn btn-block btn-danger' onClick={handleClose}>
          Close Ticket
        </button>
      )}
    </div>
  );
};

export default Ticket;
