import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query' // to send data (optimize to send data, better than useQuery)

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { createNewEvent } from '../../util/http.js';
import { queryClient } from '../../util/http.js';


export default function NewEvent() {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent, //unlike useQuery, mutationFn does NOT automatically send the request upon the component
    // creation. So 'mutate' is a very important object we can call when we want to call the createNewEvent function.
    onSuccess: ()=>{ // this only executes if the mutation was sucessful.
      queryClient.invalidateQueries({queryKey:["events"]}); // this tells ReactQuery that the data fetched by some queries is outdated now,
      // that it should be marked as staled, and an immediate refetch should be triggered if the query belongs to a
      // component that is visible on the screen. We have to give it an object which has the queryKey that we want to
      // re-execute. In here: ["events"], includes ALL QUERIES that include that key even if they have something afterwards.
      // It does not have to be the same key. If we want just one exact query, we can add: 'exact: true'.
      navigate('/events');
    },

  });

  function handleSubmit(formData) {
    mutate({ event: formData }) // the data inside the mutate() function, is dependant on our specific application/backend.
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && 'Submitting...'}
        {!isPending && (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        )}
      </EventForm>
      {isError && <ErrorBlock title={"Failed to create event"} message={error.info?.message || "Failed to create event. \
        Please check your input and try again later."}/>}
    </Modal>
  );
}
