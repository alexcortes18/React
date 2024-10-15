import { Link } from "react-router-dom";

const EVENTS = [
    { id: 1, title: "Event number 1!" },
    { id: 2, title: "Event number 2!" },
    { id: 3, title: "Event number 3!" },
]

function EventsPage() {
    return (
        <>
            <h1>Events Page!</h1>
            {EVENTS.map((event)=>
            <li key={event.id}>
                <Link to={`/events/${event.id}`}>{event.title}</Link>
            </li>)}
        </>
    );
}

export default EventsPage;