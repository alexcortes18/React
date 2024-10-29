import { Link } from 'react-router-dom';
import classes from './EventsList.module.css';

function EventsList({ events }) { // This was before when we used the loader in EventsPage.
// function EventsList(){
  // const events = useLoaderData(); // we can also use the loader directly here since its a child of EventsPage.
  return (
    <div className={classes.events}>
      <h1>All Events</h1>
      <ul className={classes.list}>
        {events.map((event) => ( 
          <li key={event.id} className={classes.item}>
            {/* <Link to={event.id}> Relative path. Goes to Event Details Page */}
              <Link to={`/events/${event.id}`}>
              <img src={event.image} alt={event.title} />
              <div className={classes.content}>
                <h2>{event.title}</h2>
                <time>{event.date}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsList;
