import { useContext } from "react"
import CartContext from "../store/CartContext"
import Modal from './UI/Modal.jsx'
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext)

    const cartTotalPrice = cartCtx.items.reduce((totalPrice, item) => {
        return totalPrice + item.quantity * item.price;
    }, 0)

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }
    function handleOpenCheckout() {
        userProgressCtx.showCheckout();
    }

    return (
        <Modal
            className="cart"
            open={userProgressCtx.progress === 'cart'}
            onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null} //to avoid triggering the handleCloseCart if
            //not needed between re-renders when we click the checkout button.
        >
            <h2>Your Cart.</h2>
            <ul>
                {cartCtx.items.map(item =>
                    <CartItem
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        price={item.price}
                        onIncrease={() => cartCtx.addItem(item)}
                        onDecrease={() => cartCtx.removeItem(item.id)}
                    />
                )}
            </ul>
            <p className="cart-total">Total Price is: {currencyFormatter.format(cartTotalPrice)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {cartCtx.items.length !== 0 &&
                    <Button onClick={handleOpenCheckout}>Go to checkout</Button>}
            </p>
        </Modal>
    )
}