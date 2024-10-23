import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";

function EditEventPage() {
    // const data = useLoaderData();
    const data = useRouteLoaderData('event-detail'); // we need an ID since now the loader is for more than one path.
    const event = data.event;

    return <EventForm event={event}/>
}

export default EditEventPage;