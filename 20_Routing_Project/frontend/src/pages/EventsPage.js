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
            {/* ^ If we decide to use the loader here, we can pass the events as a prop */}
            {/* <EventsList/> If we decide to use the loader in the child component, no need to pass the prop */}
        </>
    );
}

export default EventsPage;

export async function loader() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        // ... for later
    } else {
        const resData = await response.json();
        return resData.events;
        // the loader function makes the returned value available in the page we render here (EventsPage)
        // It is ALSO available for any children of <EventsPage>
    }
    // loader -> allows us to load and fetch our data before rendering the component <EventsPage>
    // loader is a property that loads/executes the function whenever we are about to visit this route.
    // So just before the JSX code is render, the loader function gets executed. This is wanted to be able
    // to load an http request before rendering the component (which is the behavior we have learned so far
    // while using useEffect().)
}