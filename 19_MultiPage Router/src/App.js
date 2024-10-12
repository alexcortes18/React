import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import HomePage from './pages/Home';

const router = createBrowserRouter([
  // each object is a path to be defined.
  // Path: which path we want, and element: which component to show.
  {path:'/', element: <HomePage/>},
])

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
