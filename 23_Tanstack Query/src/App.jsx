import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query' // these 2 are needed to be able to use
// query Tanstack on our app and components.

import Events from './components/Events/Events.jsx';
import EventDetails from './components/Events/EventDetails.jsx';
import NewEvent from './components/Events/NewEvent.jsx';
import EditEvent from './components/Events/EditEvent.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/events" />,
  },
  {
    path: '/events',
    element: <Events />,

    children: [
      {
        path: '/events/new',
        element: <NewEvent />,
      },
    ],
  },
  {
    path: '/events/:id',
    element: <EventDetails />,
    children: [
      {
        path: '/events/:id/edit',
        element: <EditEvent />,
      },
    ],
  },
]);

const queryClient = new QueryClient(); // general configuration object that will be required by Tanstack Query.

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
