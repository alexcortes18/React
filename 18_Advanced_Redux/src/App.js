import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { sendCartData } from './store/cart-actions';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);


  // We need to have an useEffect to be able to handle http requests. This is because the reducers of our Slicers,
  // SHOULD NOT manage asynchronous code. Given this, we can outsource our code to a hook like useEffect in our
  // component, BUT maybe it gets too long. This is why then we can outsource it again to the same file of our slicer
  // but not in the createSlice() itself, rather in another separate function (which could be a THUNK).
  useEffect(() => {
    if(isInitial){
      isInitial = false; // This is require as a first pass since if not it would run one time and update send 
      // information to the backend. In THIS case, we only want to send info when the cart updates.
      return;
    }
    dispatch(sendCartData(cart)); // even though dispatch should be only with reducers of our slicers, we can 
    // dispatch any name of function as long as they themselves return another function (this is named THUNK),
    // which can have any logic PLUS dispathing actions defined in our Slices.
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.status}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
