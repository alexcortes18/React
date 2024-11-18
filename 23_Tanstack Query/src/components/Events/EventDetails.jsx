import { Link, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom';

import Header from '../Header.jsx';
import { fetchEvent } from '../../util/http.js';

export default function EventDetails() {
  const params = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events", { id: params.id }],
    queryFn: ({ signal }) => fetchEvent({ id: params.id, signal }),
  });


  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">
        <header>
          {data && (
            <h1>{data.title}</h1>
          )}
          <nav>
            <button>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt="" />
          <div id="event-details-info">
            <div>
              {data && (
                <p id="event-details-location">{data.location}</p>
              )}
              {data && (
                <time dateTime={`Todo-DateT$Todo-Time`}>{`${data.date}@${data.time}`}</time>
              )}
            </div>
            {data && (
              <p id="event-details-description">{data.description}</p>
            )}
          </div>
        </div>
      </article>
    </>
  );
}
