// import { useEffect, useState } from 'react';

import EventsList from '../components/EventsList';
import { useLoaderData } from 'react-router-dom'; // to use data from a loader function from the Router Component.

function EventsPage() {
    // The following commented code is BEFORE using data from a Loader in the Route Component
    //   const [isLoading, setIsLoading] = useState(false);
    //   const [fetchedEvents, setFetchedEvents] = useState();
    //   const [error, setError] = useState();

    //   useEffect(() => {
    //     async function fetchEvents() {
    //       setIsLoading(true);


    // we moved this to the loader function of our router component (path of EventsPage)
    //------------------------------------------------------------------------
    //   const response = await fetch('http://localhost:8080/events');

    //   if (!response.ok) {
    //     setError('Fetching events failed.');
    //   } else {
    //     const resData = await response.json();
    //     setFetchedEvents(resData.events);
    //   }
    //------------------------------------------------------------------------

//     setIsLoading(false);
// }
// fetchEvents();
//   }, []);

    const events = useLoaderData(); // this as it is, provides us with the data coming from our Loader function
    // that we defined in the App.js, in our Router in the <EventsPage/> route path's loader.

return (
    <>
        {/* <div style={{ textAlign: 'center' }}>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
        </div> */}
        {/* {!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />} */}
        <EventsList events={events} />
    </>
);
}

export default EventsPage;