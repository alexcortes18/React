import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient(); // we moved it here from App.js because now we want both App.js and EventForm
// to use it. It technically could have been an export from App.js, but I imagine is more practical or good practice
// now since now it is used with "http logic" by NewEvent.

export async function fetchEvents({ signal, searchTerm, max }) { //destructuring same as FindEventSection.jsx
    // signal is used by ReactQuery to abort this fetching if it thinks it should do that, for example if we 
    // leave the page.

    console.log(searchTerm);
    let url = 'http://localhost:3000/events';

    // We later added the funcionality of seeing only the latest '3' events in our NewEventSection by adding 'max'.
    // This is also supported by the backend code.

    if (searchTerm && max) {
        url += '?search=' + searchTerm + '?max=' + max;
    } else if (searchTerm) {
        url += '?search=' + searchTerm;  // adding a query search to the url
    } else if (max) {
        url += '?max=' + max;
    }

    const response = await fetch(url, { signal: signal }); //the built in fetch function has a second property which
    // accepts a configuration object in which we can include the signal property that comes from ReactQuery's
    // queryFn.

    if (!response.ok) {
        const error = new Error('An error occurred while fetching the events');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const { events } = await response.json();

    return events;
}

// This is for useMutation, that we are using in NewEvent.jsx
export async function createNewEvent(eventData) {
    const response = await fetch(`http://localhost:3000/events`, {
        method: 'POST',
        body: JSON.stringify(eventData),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = new Error('An error occurred while creating the event');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const { event } = await response.json();

    return event;
}

// This is for useQuery, that we are using in EventForm.jsx
export async function fetchSelectableImages({ signal }) {
    const response = await fetch(`http://localhost:3000/events/images`, { signal });

    if (!response.ok) {
        const error = new Error('An error occurred while fetching the images');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const { images } = await response.json();

    return images;
}

// to be used with EventsDetails' useQuery.
export async function fetchEvent({ id, signal }) {
    const response = await fetch(`http://localhost:3000/events/${id}`, { signal });

    if (!response.ok) {
        const error = new Error('An error occurred while fetching the event');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const { event } = await response.json();

    return event;
}

// to be used with EventsDetails' useMutation.
export async function deleteEvent({ id }) {
    const response = await fetch(`http://localhost:3000/events/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const error = new Error('An error occurred while deleting the event');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    return response.json();
}

export async function updateEvent({ id, event }) {
    const response = await fetch(`http://localhost:3000/events/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ event }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = new Error('An error occurred while updating the event');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    return response.json();
}