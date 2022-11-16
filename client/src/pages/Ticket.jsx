import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { getTicket, reset, closeTicket } from '../features/tickets/ticketSlice';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const Ticket = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets,
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(ticketId));
  }, [dispatch, isError, message, ticketId]);

  const handleClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success('Ticket Closed');
    navigate('/tickets');
  };

  if (isLoading) return <Spinner />;

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
      </header>

      {ticket.status !== 'closed' && (
        <button className='btn btn-block btn-danger' onClick={handleClose}>
          Close Ticket
        </button>
      )}
    </div>
  );
};

export default Ticket;
