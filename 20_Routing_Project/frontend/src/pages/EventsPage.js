// import { useEffect, useState } from 'react';

import EventsList from '../components/EventsList';
import { useLoaderData, json } from 'react-router-dom'; // to use data from a loader function from the Router Component.

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

    const data = useLoaderData(); // this as it is, provides us with the data coming from our Loader function
    // that we defined in the App.js, in our Router in the <EventsPage/> route path's loader.

    // if(data.isError){ // data return by loader function, and isError is true when !response.ok happens
    //     return <p>{data.message}</p>
    // }

    const events = data.events; // if we just return 'response' in our Loader function.

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
    const response = await fetch('http://localhost:8080/eventss');

    if (!response.ok) {
        // Option 1:
        // return { isError: true, message: 'Could not fetch events.'}; // one way of doing it or:

        // Option 2:
        // throw {message: 'Could not fetch events.'}; // this is pass to the errorElement's component (ErrorPage) as 
        //part of the useRouteError hook.

        // Option 3:
        // throw new Response(JSON.stringify({ message: "Could not fetch events." }),
        // { status: 500 }); // we can throw a Response instead of a normal JS object to include a status object.
        // This can again be be used in errorElement's component by using the useRouteError hook.

        // Option 4: //json function from React-router
        throw json({ message: "Could not fetch events." }, {
            status: 500
        });

    } else {
        // this was before... :
        // OPTION 1:
        // const resData = await response.json();
        // return resData.events; 


        // we can return any kind of data, for example a 'Response' data, because the React 'router' package
        // will already extrat the data from our Response when using useLoaderData(). But why return a Response
        // object like the one below:
        // OPTION 2:
        // const res = new Response('any data', {status: 201}); //built in into the browser. A modern browser feature.

        // if we can just return {const resData = await response.json(); return resData.events;} ? Because
        // fetch returns a Promise that resolves to a Response: Promise<Response>.

        // so we can just take the response and return that in the loader;
        // OPTION 3:
        return response; // and useLoaderData will give us the data from the response, but we might need to dig a bit
        // into it like something.events (in this case we have an events object).

    }
}