import {
  useNavigation,
  useNavigate,
  Form,
  useActionData,
  json,
  redirect
} from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate(); // to programatically navigate to another route
  const navigation = useNavigation(); // access to current navigation status (idle, loading, submitting), with
  // navigation.state

  const data = useActionData(); // the 'response' from NewEventPage if there is a validation error. useActionData
  // is used with action functions, and useLoaderData with loader functions.

  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      {/* 
      we use Form (and not the common 'form') from react-router to deal easier with the form data.
      Instead of submitting the form, React Router submits it to our 'action' in our path of our router element. 
      
      IMPORTANT: the form data is automatically submitted to the action function of the route that rendered the form.
      In this case to: http://localhost:3000/events/new, which is to NewEventPage.js
      */}

      {/* 
      If we used the prop or value: 'action', like 'action:/some-path' in this Form, this will trigger
      the action in that other path, whenever the Form is submitted. If no action is specified then, it is the
      action of the route that rendered the form.
      */}

      {/* ---------------------------------------------------------------- */}
      {/* This is data from the backend sent as a reponse: */}
      {data && data.errors &&
        <ul>
          {Object.values(data.errors).map(err => ( //Object.values returns an array of the values of in a object.
            <li key={err}>{err}</li>
          ))}
        </ul>}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title" //this names are important to be able to extract the data later.
          required
          defaultValue={event ? event.title : ''} />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ''} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ''} />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ''} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function action({ request, params }) { // default paramenters given by React Router
  // request contains form data.
  console.log(request);
  const data = await request.formData();
  const method = request.method;

  // all of these are the 'names' of the inputs of the form.
  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description')
  }

  // Now with URL and method we are making this more generalized to either send it to:
  // 1. /events and method post -> to add an event
  // 2. /events/id and method patch -> to edit an event.
  let url = 'http://localhost:8080/events';

  if (method === 'PATCH') {
    const eventId = params.eventId;
    url = 'http://localhost:8080/events/' + eventId;
  }

  const response = await fetch(url, {
    method: method,//'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData)
  });

  // In this case instead of returning an error page, it is better if we return somethign else for the form.
  if (response.status === 422) { //422 is set in the dummy backend as some validation error.
    return response; // this can be later used with useActionData().
    // we are returning the same data from the backend. In this case -> {message:..., errors}. Go look at events.js
  }

  // if we return this error, then we prompt the Error Page to appear.
  if (!response.ok) {
    throw json({ message: 'Could not save event' }, { status: 500 });
  }

  return redirect('/events'); //creates a response object that redirects to a new page.
}