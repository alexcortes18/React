import { useNavigate, Form } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();
  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method='post' className={classes.form}>
      {/* 
      we use Form (and not the common 'form') from react-router to deal easier with the form data.
      Instead of submitting the form, React Router submits it to our 'action' in our path of our router element. 
      
      IMPORTANT: the form data is automatically submitted to the action function of the route that rendered the form.
      In this case to: http://localhost:3000/events/new, which is to NewEventPage.js
      */}
      <p>
        <label htmlFor="title">Title</label>
        <input 
        id="title" 
        type="text" 
        name="title" //this names are important to be able to extract the data later.
        required 
        defaultValue={event ? event.title : ''}/>
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input 
        id="image" 
        type="url" 
        name="image" 
        required 
        defaultValue={event ? event.image : ''}/>
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
        id="date" 
        type="date" 
        name="date" 
        required 
        defaultValue={event ? event.date : ''}/>
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
        id="description" 
        name="description" 
        rows="5" 
        required
        defaultValue={event ? event.description : ''}/>
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button>Save</button>
      </div>
    </Form>
  );
}

export default EventForm;
