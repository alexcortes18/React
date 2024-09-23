import { useContext } from "react"
import CartContext from "../store/CartContext"
import Modal from './UI/Modal.jsx'
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext)

    const cartTotalPrice = cartCtx.items.reduce((totalPrice, item)=>{
        return totalPrice + item.quantity*item.price;
    },0)

    function handleCloseCart(){
        userProgressCtx.hideCart();
    }

    return <Modal className="cart" open={userProgressCtx.progress==='cart'}>
        <h2>Your Cart.</h2>
        <ul>
            {cartCtx.items.map(item =>
                <li key={item.id}>
                    {item.name} - {item.quantity}
                </li>)}
        </ul>
        <p className="cart-total">Total Price is: {currencyFormatter.format(cartTotalPrice)}</p>
        <p className="modal-actions">
            <Button textOnly onClick={handleCloseCart}>Close</Button>
            <Button onClick={handleCloseCart}>Go to checkout</Button>
        </p>
    </Modal>
}