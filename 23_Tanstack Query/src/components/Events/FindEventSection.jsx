import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../../util/http';
import LoadingIndicator from '../UI/LoadingIndicator';
import ErrorBlock from '../UI/ErrorBlock';
import EventItem from './EventItem';

export default function FindEventSection() {
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value); // we update the state to then use it as a queryKey, since if
    // we use the ref as queryKey the page would not be update since REFs dont update UI.
  }

  const {data, isPending, isError, error } = useQuery({
    queryKey: ['events', { search: searchTerm}], //dynamic example of queryKey
    queryFn: ({signal}) => fetchEvents({signal, searchTerm})
    // ReactQuery passes a default object to the function we defined, in this case fetchEvents.
    // So if we want to modify said object to pass more things, or some specific things we have to use object
    // destructuring in the custom function: {signal, searchTerm}, and include the properties we want.
    // In this case, searchTerm is a value we provide to our default function, but signal is a term provided
    // with ReactQuery/ Tanstack to be able to abort the fetching if something happens.
  })

  let content = <p>Please enter a search term to find events.</p>;

  if (isPending){
    content = <LoadingIndicator/>;
  }

  if (isError){
    content = <ErrorBlock title={"An error occured"} 
    message={error.info?.message || "Failed to fetch events."}/>
  }

  if (data){
    content = <ul className='events-list'>
      {data.map(event => 
      <li key={event.id}>
        <EventItem event={event}/></li>)}
    </ul>
  }

  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}
