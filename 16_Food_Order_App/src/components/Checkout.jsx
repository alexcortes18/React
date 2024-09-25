import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import Input from "./UI/Input";

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotalPrice = cartCtx.items.reduce((totalPrice, item) => {
        return totalPrice + item.quantity * item.price;
    }, 0)

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        fetch('http://localhost:3000/orders',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData //uses the data from the form from all inputs with the "name" object. The <Input> has 
                    // the 'name' incoming from the id prop.
                }
            })
        });
    }

    return <Modal open={userProgressCtx.progress === 'checkout'} onClose={() => userProgressCtx.hideCheckout()}>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotalPrice)}</p>

            <Input label="Full Name" type="text" id="name" />
            <Input label="E-Mail Address" type="email" id="email" />
            <Input label="Street" type="text" id="street" />
            <div className="control-row">
                <Input label="Postal Code" type="text" id="postal-code" />
                <Input label="City" type="text" id="city" />
            </div>
            <p className="modal-actions">
                <Button type="button" textOnly onClick={() => userProgressCtx.hideCheckout()}>Close</Button>
                <Button>Submit Order</Button>
            </p>
        </form>
    </Modal>
}