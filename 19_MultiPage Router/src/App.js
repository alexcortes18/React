import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import HomePage from './pages/Home';
import ProductsPage from './pages/Products';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import ProductDetailsPage from './pages/ProductDetail';

// First way of defining routes.
const router = createBrowserRouter([
  // each object is a path to be defined.
  // Path: which path we want, and element: which component to show.
  {
    path: '/', 
    element: <RootLayout></RootLayout>,
    errorElement: <ErrorPage/>,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'products', element: <ProductsPage />},
      { path: 'products/:productId', element: <ProductDetailsPage/>}
      // when adding ":", we are making a dynamic route.
    ]
    // when we do NOT add "/" for the first character of the path of the children, we make them relative paths, 
    // which makes React go and wrap them around the parent path (which is ok). If we add the "/" we make it absolute
    // path.
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
