import EventForm from "../components/EventForm";
import { json, redirect } from "react-router-dom";

function NewEventPage() {
    return <EventForm />;
}

export default NewEventPage;

export async function action({request, param}) { // default paramenters given by React Router
    // request contains form data.
    const data = await request.formData();

    // all of these are the 'names' of the inputs of the form.
    const eventData = {
        title: data.get('title'),
        image: data.get('image'),
        date: data.get('date'),
        description: data.get('description')
    }

    const response = await fetch('http://localhost:8080/events',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
    });

    if(!response.ok){
        throw json({message: 'Could not save event'}, {status:500});
    }

    return redirect('/events'); //creates a response object that redirects to a new page.
}