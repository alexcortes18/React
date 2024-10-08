import Header from "./components/Header";
import Meals from "./components/Meals";
import CartContext, { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function App() {
  return (
    <>
      <CartContextProvider>
        <UserProgressContextProvider>
          <Header />
          <Meals />
          <Cart></Cart>
          <Checkout></Checkout>
        </UserProgressContextProvider>
      </CartContextProvider>
    </>
  );
}

export default App;
