import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";

export default function Cart() {
  const {items, updateItemQuantity} = useContext(CartContext);
  // const cartCtx = useContext(CartContext); We can use it as a variable and then use the properties inside the variable.
  // const {items} = useContext(CartContext); We can also destructure the variable.

  /* 
  We could also do the following way to use our context without useContext():
  (Using the .Consumer from the context, we can use a arrow function that receives the context and returns us the component
  we need.) Example:
      return (
        <CartContext.Consumer>
          {(cartCtx)=> {
            .... some logic code

              return (
                <div>
                etc...
                etc...
                <div/>
              )
            }
          }
        </CartContext.Consumer>
      )
  This approach is used for older or legacy code. Learn it just in case you might encounter it in other projects.
  */

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div id="cart">
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul id="cart-items">
          {items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => updateItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
