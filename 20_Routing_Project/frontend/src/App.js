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
import EventsPage, { loader as eventsLoader } from './pages/EventsPage';
import EventDetailPage, { loader as eventDetailLoader, action as deleteEventAction } from './pages/EventDetailPage';
import EditEventPage from './pages/EditEventPage';
import NewEventPage from './pages/NewEventPage';
import RootLayout from './pages/RootLayout';
import EventRootLayout from './pages/EventRoot';
import ErrorPage from './pages/Error'
import { action as manipulateEventAction } from './components/EventForm';
import NewsletterPage, { action as newsletterAction } from './components/Newsletter';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />, // this will show up if there is an error in this level, or any lower level.
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventRootLayout />,
        children: [
          // { path: "", element: <EventsPage/> },
          {
            index: true, element: <EventsPage />,
            loader: eventsLoader,
            // we MUST put the loader in the path of the child that will load the HTTP request.

            // loader -> allows us to load and fetch our data before rendering the component <EventsPage>
            // loader is a property that loads/executes the function whenever we are about to visit this route.
            // So just before the JSX code is render, the loader function gets executed. This is wanted to be able
            // to load an http request before rendering the component (which is the behavior we have learned so far
            // while using useEffect().)

            // the loader function makes the returned value available in the page we render here (EventsPage)
            // It is ALSO available for any children of <EventsPage>
          },
          {
            path: ':eventId',
            id: 'event-detail', //id to identify which loader we want to use with useRouterLoaderData(). This is
            // for the children of this path, like EventDetailPage and EditEventPage.
            loader: eventDetailLoader, // now this loader is available for both pages.
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              { path: 'edit', 
                element: <EditEventPage />,
                action: manipulateEventAction
              },
            ]
          },
          {
            path: 'new', 
            element: <NewEventPage />,
            // action functions allows us to: to handle form submissions or HTTP methods that change data, like POST, 
            // PATCH, PUT, or DELETE. It is responsible for handling side effects or modifying server-side data, such as 
            // creating, updating, or deleting events.
            action: manipulateEventAction
          },
        ]
      },
      {
        path: 'newsletter',
        element: <NewsletterPage/>,
        action: newsletterAction,
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
