import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import HomePage from './pages/Home';
import ProductsPage from './pages/Products';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';

// First way of defining routes.
const router = createBrowserRouter([
  // each object is a path to be defined.
  // Path: which path we want, and element: which component to show.
  {
    path: '/', 
    element: <RootLayout></RootLayout>,
    errorElement: <ErrorPage/>,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/products', element: <ProductsPage />}
    ]
  }
]);

// // Second way of defining routes.
// const routeDefinitions = createRoutesFromElements(
//   <Route>
//     <Route path="/" element={<HomePage/>}/>
//     <Route path="/products" element={<ProductsPage/>}/>
//   </Route>
// );
// // Continue with this second way using createBrowserRouter:
// const router = createBrowserRouter(routeDefinitions);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
