import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import Product from './components/Product.jsx'
import CartContextProvider from './store/shopping-cart-context.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';

function App() {
  return (
    <CartContextProvider>
      <Header/>
      <Shop>
        {/* This inside the Shop component is a procedured named component composition, but it is not too recommended.
        It is better to use "Context API" */}
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}
export default App;
