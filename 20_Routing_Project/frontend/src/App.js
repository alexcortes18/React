// Challenge / Exercise
// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import EditEventPage from './pages/EditEventPage';
import NewEventPage from './pages/NewEventPage';
import RootLayout from './pages/RootLayout';
import EventRootLayout from './pages/EventRoot';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: ,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventRootLayout />,
        children: [
          // { path: "", element: <EventsPage/> },
          { index: true, element: <EventsPage/>, loader: async()=> {
            const response = await fetch('http://localhost:8080/events');

            if (!response.ok) {
              // ... for later
            } else {
              const resData = await response.json();
              return resData.events;
              // the loader function makes the returned value available in the page we render here (EventsPage)
              // and in any other component where we need it.
            }
            // loader -> allows us to load and fetch our data before rendering the component <EventsPage>
            // loader is a property that loads/executes the function whenever we are about to visit this route.
            // So just before the JSX code is render, the loader function gets executed. This is wanted to be able
            // to load an http request before rendering the component (which is the behavior we have learned so far
            // while using useEffect().)
          }},
          { path: ':eventId', element: <EventDetailPage /> },
          { path: 'new', element: <NewEventPage /> },
          { path: ':eventId/edit', element: <EditEventPage /> },
        ]
      }
    ]
  }
]);


function App() {
  return <RouterProvider router={router} />
}

export default App;
