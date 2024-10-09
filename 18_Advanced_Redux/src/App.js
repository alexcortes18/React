import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);

  useEffect(()=>{
    fetch('https://react-http-ab40a-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',{
      method: 'PUT', // to replace data instead of creating a new resource in the server (POST).
      body: JSON.stringify(cart)
    })
  },[cart]);


  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
