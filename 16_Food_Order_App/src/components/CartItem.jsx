import { currencyFormatter } from "../util/formatting"

export default function CartItem({ name, quantity, price, onDecrease, onIncrease }) {
    return <li className="cart-item">
        <p>
            {name} - {quantity} x {currencyFormatter.format(price)}
        </p>
        <p className="cart-item-actions">
            <button onClick={onIncrease}>+</button>
            <span>QTY</span>
            <button onClick={onDecrease}>-</button>
        </p>
    </li>
}