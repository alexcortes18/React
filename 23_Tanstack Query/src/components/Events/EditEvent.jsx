import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchEvent, updateEvent, queryClient } from '../../util/http.js';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
// import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const params = useParams();

  // this is to fetch the data of the event we want to Edit. To have it populate in the Event Form.
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', { id: params.id }],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id })
  });

  const { mutate } = useMutation({
    mutationFn: updateEvent,
    // OPTIMISTIC update:
    // To update first in the UI and then send the update to the backend, and if something bad happens in the backend
    // we roll back to the first state.

    // This can be tested in this app by: Erasing the title or any field in the EditEvent pop up when we click
    // edit. Then we click update, and the update should not work, since the backend does not accept and empty
    // input. So the rollback WILL HAPPEN. You can visualize it better with 3G throttling. The input will be 
    // temporarily gone (optimitically updated) but then when we get error from the backend then it will be
    // rollback to the previous data with 'previousEvent'.

    onMutate: async (data) => // in here we want to update the data that is cached by React Query.
    { // data: is the received data we give to mutate(), given to us here by React Query.
      const newEvent = data.event // because what we are receiving from data is: {id: params.id, event: formData}

      await queryClient.cancelQueries({ queryKey: ['events', { id: params.id }] });
      // This cancelQueries is important to cancel the outgoing queries for that key, to avoid clashing response
      // from those queries and the Optimistic updated query data. To avoid fetching old data from other queries
      // with the same key, since in here we are directly updating the cache data with onMutate.
      // This returns a Promise so we need to 'await' it, and add 'async' to the anonymous function.

      const previousEvent = queryClient.getQueryData(['events', { id: params.id }]);
      // getQueryData allows us to get the CURRENT stored data of the specified queryKey
      // in here we get the data to be able to rollback later if the Optimistic Update fails. For that to happen
      // we need to 'return' this value in this onMutate function.

      queryClient.setQueryData(['events', { id: params.id }], newEvent); // to manipulate the already stored data
      // on only THIS query without waiting for a response.

      return { previousEvent: previousEvent } // we return an object to be sent to 'context'
    },
    onError: (data, error, context) => { // onError executes if mutationFn fails. 
      // It receives some parameters by React Query: 'error', 'data' (which was submitted to the mutation), and 'context'.
      // This 'context' object can contain the 'previousEvent' from before. (since it was returned)

      // In here we rollback if we fail the update sent to the backend!:
      // console.error('Mutation failed:', error); // if we need to see some log messages for any mistake.
      // console.log('Rolling back to:', context.previousEvent);
      queryClient.setQueryData(['events', { id: params.id }], context.previousEvent);
    },

    // This will be called whenever this mutation is done, no matter if it failed or succeeded.
    onSettled: () => {
      queryClient.invalidateQueries(['events', { id: params.id }]);
      // just to be extra sure that the backend and frontend have the same data, we invalidate the query with the
      // key we want to invalidate, and make ReactQuery refetch it with this fn.
    }


  });

  function handleSubmit(formData) {
    mutate({ id: params.id, event: formData });
    navigate('../');
  }

  function handleClose() {
    navigate('../');
  }

  let content;

  // We got rid of this since there should not be any scenario now where we need to show a Loading Indicator.
  // This is because now, with the loader() function, we get the data before the component loads.
  // if (isPending) {
  //   content = <div className='center'>
  //     <LoadingIndicator />
  //   </div>
  // }
  if (isError) {
    content = <>
      <ErrorBlock title="Failed to load event."
        message={error.info?.message || 'Failed to load event. Please check your inputs and try again later.'} />
      <div className='form-actions'>
        <Link to="../" className='button'>Okay</Link>
      </div>

    </>
  }
  if (data) {
    content = <EventForm inputData={data} onSubmit={handleSubmit}>
      <Link to="../" className="button-text">
        Cancel
      </Link>
      <button type="submit" className="button">
        Update
      </button>
    </EventForm>
  }

  return (
    <Modal onClose={handleClose}>
      {content}
    </Modal>
  );
}

export function loader({params}) { //params property received by React Router which contains access to the route parameter of this active route.
  // Since here we cannot use useQuery, we can still use queryClient to do the same thing.
  
  return queryClient.fetchQuery({
    queryKey: ['events', { id: params.id }],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id })
  });


// Using a loader pre-fetches the data before rendering the component, ensuring the component has the required data on 
// initial load.

// However, sticking with useQuery alongside the loader is advantageous because React Query handles:
// Automatic re-fetching (e.g., when revisiting the tab or focusing back on the window).
// Cache management, ensuring the UI stays responsive and up-to-date with minimal boilerplate.

// Alex:
// This is to have another approach:
// Either we take some more time loading the component and then displaying it with all the data
// or
// We load the component (without this function) and then show the LoadingIndicator with isPending.
}