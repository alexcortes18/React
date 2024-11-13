import { useQuery } from '@tanstack/react-query' // hook from Tanstack library for fetching data and gives us info.

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';
import { fetchEvents } from '../../util/http.js';

export default function NewEventsSection() {

  // Tanstack is a library that HELPS us with http related things. It does NOT send HTTP requests by itself.
  // Not on its own. We have to write the code that sends the actual HTTP requests. Tanstack Query then manages
  // the data, errors, caching, and much more.

  // useQuery gives an object that can be destructured into:
  // - data; returned by the custom queryFn.
  // - isPending: to know if the request is done and have a response
  // - isError: is true if we got an error but we have to set it and throw the error in our queryFn.
  // - error: contains information about the error, like the message
  // many more.
  const { data, isPending, isError, error } = useQuery({ 
    queryKey: ['events'], // to be able to reuse or to cache the data that is yield by the request. 
    // This key is an array, because the query can be more complex like:
    // queryKey: ['event', eventId, ['reviews', { sort: 'recent' }]], for example.
    queryFn: fetchEvents, // main function (queryFn) to be able to execute HTTP logic (written by us)
    staleTime: 5000, // this controls after how much time React Query will send a request for an updated on the data
    // if it finds data in our cache. Default is zero. Now set to 5s.
    // gcTime: 30000 // garbage collector time: controls how much time the data in the cache will be kept around.
    // Default is 5 minutes.
  });

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock 
      title="An error occurred" 
      message={error.info?.message || "Failed to fetch events."} />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
