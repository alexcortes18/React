import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query'
import { deleteEvent, fetchEvent, queryClient } from '../../util/http.js';
import Header from '../Header.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { useState } from 'react';
import Modal from '../UI/Modal.jsx';

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", { id: params.id }],
    queryFn: ({ signal }) => fetchEvent({ id: params.id, signal }),
  });

  const { mutate, isPending: isPendingDeletion, isError: isErrorDeleting, error: deleteError } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        // is a function from React Query that tells the library to refetch specific cached data. 
        // You use it to ensure your UI shows the latest data, especially after a mutation (e.g., updating or deleting data).
        queryKey: ['events'],
        refetchType: 'none' //This means that the queries with 'events' as ID won't be retriggered immediately, but
        // they will only be invalidated, and the next time they are required, they will run again.
      })
      navigate('/events');
    }
  });

  function handleStartDelete() {
    setIsDeleting(true);
  }

  function handleStopDelete() {
    setIsDeleting(false);
  }
  function handleDelete() {
    mutate({ id: params.id });
  }

  let content;

  if (isPending) {
    content = <div id="event-details-content" className='center'>
      <p>Fetching data event...</p>
    </div>
  }
  if (isError) {
    content = <div id="event-details-content" className='center'>
      <ErrorBlock title="Failed to load event"
        message={
          error.info?.message || 'Failed to fetch event data, please try again later'
        } />
    </div>
  }
  if (data) {
    const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleStartDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>{`${formattedDate}@${data.time}`}</time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>

      </>
    )
  }

  return (
    <>
      {isDeleting &&
        <Modal onClose={handleStopDelete}>
          <h2>Are you sure?</h2>
          <p>Do you really want to delete this event? This action cannot be undone.</p>
          <div className='form-actions'>
            {isPendingDeletion && <p>Deleting, please wait...</p>}
            {!isPendingDeletion && (
              <>
                <button onClick={handleStopDelete} className='button-text'>Cancel</button>
                <button onClick={handleDelete} className='button'>Confirm</button>
              </>
            )}
          </div>
          {isErrorDeleting && <ErrorBlock title="Failed to delete event."
          message={deleteError.info?.message || 'Failed to delete event, please try again later.'}/>}
        </Modal>
      }
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">{content}</article>
    </>
  );
}
