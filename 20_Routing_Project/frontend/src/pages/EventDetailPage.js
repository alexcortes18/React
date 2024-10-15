import { useParams } from "react-router-dom";

function EventDetailPage() {
    const params = useParams();

    return (
        <>
            <h1>This is the EventDetailPage!</h1>
            <p>This is the event #{params.eventId}</p>
        </>
    );
}

export default EventDetailPage;