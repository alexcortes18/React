import { useRouteLoaderData, json, redirect, defer, Await } from "react-router-dom";
import { Suspense } from 'react';
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

function EventDetailPage() {
    // const data = useLoaderData(); // to load data from our loader.
    // const data = useRouteLoaderData('event-detail'); // we need an ID since now the loader is for more than one path.
    // Meaning that children from the path of this ID can use this loader.

    // since we are using defer() now:
    const { event, events } = useRouteLoaderData('event-detail'); // these are FROM the defer();

    return (
        <>
            {/* This was before we had the defer() function:‰ */}
            {/* <EventItem event={data.event} /> */}
            {/* our backend API has the 'event' data on the overall data object. */}

            {/*  This is an example of how we can load data fast while waiting for data that might take 
            some time. In the single event data, the backend resolves it quickly. BUT in the data
            events, it takes some time (we used a setTimeout of 2 seconds in routes/events.js).  */}

            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={event}>
                    {/* AGAIN REMEMBER: loadEvent is the data from the "await response.json().event" */}
                    {(loadEvent) => <EventItem event={loadEvent} />}
                </Await>
            </Suspense>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={events}>
                    {/* AGAIN REMEMBER: loadEvent is the data from the "await response.json().event" */}
                    {(loadEvents) => <EventsList events={loadEvents} />}
                </Await>
            </Suspense>
        </>
    );
}

export default EventDetailPage;

async function loadEvent(id) {
    const response = await fetch('http://localhost:8080/events/' + id);
    if (!response.ok) {
        throw json({ message: "Could not fetch details for selected event" }, {
            status: 500
        });
    } else {
        // return response; // we can return such response object in our loader. See EventsPage comments.
        const resData = await response.json();
        return resData.event;
    }
}
// copied from EventsPage:
async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        throw json({ message: "Could not fetch events." }, {
            status: 500
        });

    } else {
        // this was before... :
        // OPTION 1:
        const resData = await response.json();
        return resData.events;
    }
}

// TO GET data.
export async function loader({ request, params }) {
    const id = params.eventId; // React router provides us with 'request' and 'params' objects
    // request -> could be used to access url (request.url)
    // params -> object with all our route parameters.

    // we cannot access the ':eventId' set in the path of EventDetailPage path, because hooks (useParams) cannot
    // be used in here. so we need the params object.
    return defer({
        // If we want to control which data to load first and which to defer we can use the 'await' keyword:
        // with await: the data is capture FIRST before rendering the page.
        // without await: the data is loaded AFTER moving to the page.
        event: await loadEvent(id),
        events: loadEvents(),
    });
}

// TO DELETE data.
export async function action({ request, params }) {
    const eventId = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + eventId, {
        method: request.method // we could harcoded 'DELETE', but we can also receive it from the submitted approach
        // from the <EventItem> component.
    });
    if (!response.ok) {
        throw json({ messae: 'Could not delete event' }, { status: 500 });
    }
    return redirect('/events');
}