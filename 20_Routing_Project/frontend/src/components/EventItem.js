import classes from './EventItem.module.css';
import { Link, useSubmit } from 'react-router-dom';

function EventItem({ event }) {
  const submit = useSubmit(); //to submit data programatically.

  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure?');
  }

  if(proceed){
    submit(null, {method:'delete'});
    // The first parameter is the data we want to submit. The data would be wrap in a Form data object. But in here 
    // since we are deleting data, we dont need data to submit so null is fine.
    // The second parameter are the attributes of the Form that can be override in here.
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
