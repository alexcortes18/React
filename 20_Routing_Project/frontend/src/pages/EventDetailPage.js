import { useLoaderData, useRouteLoaderData, json, redirect } from "react-router-dom";
import EventItem from "../components/EventItem";

function EventDetailPage() {
    // const data = useLoaderData(); // to load data from our loader.
    const data = useRouteLoaderData('event-detail'); // we need an ID since now the loader is for more than one path.

    return (
        <>
            <EventItem event={data.event} />
            {/* our backend API has the 'event' data on the overall data object. */}
        </>
    );
}

export default EventDetailPage;

// TO GET data.
export async function loader({ request, params }) {
    const id = params.eventId; // React router provides us with 'request' and 'params' objects
    // request -> could be used to access url (request.url)
    // params -> object with all our route parameters.

    // we cannot access the ':eventId' set in the path of EventDetailPage path, because hooks (useParams) cannot
    // be used in here. so we need the params object.

    const response = await fetch('http://localhost:8080/events/' + id);
    if (!response.ok) {
        throw json({ message: "Could not fetch details for selected event" }, {
            status: 500
        });
    } else {
        return response; // we can return such response object in our loader. See EventsPage comments.
    }
}

// TO DELETE data.
export async function action({ request, params }) {
    const eventId = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + eventId,  {
        method: request.method // we could harcoded 'DELETE', but we can also receive it from the submitted approach
        // from the <EventItem> component.
    });
    if (!response.ok) {
        throw json({ messae: 'Could not delete event' }, { status: 500 });
    }
    return redirect('/events');
}