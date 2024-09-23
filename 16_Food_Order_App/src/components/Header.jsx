import logoImg from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from '../store/CartContext'
import { useContext } from 'react'

export default function Header() {
    const cartCtx = useContext(CartContext);

    // This works to get the total number of items, but it can be better with 'reduce'.
    // let totalCartItems = 0;
    // function countTotalItems(){
    //     for (let i=0; i< cartCtx.items.length;i++){
    //         totalCartItems += cartCtx.items[i].quantity;
    //     }
    // }
    // countTotalItems();


    // Allows us to reduce an array to a single value. Takes 2 parameters (in the arrow function). The total ongoing count,
    // and each value of the array at a time. Can also decide at what number is the initialValue.
    const totalCartItems = cartCtx.items.reduce((totalNumberofItems, item)=>{
        return totalNumberofItems + item.quantity;
    }, 0)

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="A restaurant." />
                <h1 id="title">ReactFood</h1>
            </div>
            <nav>
                <Button textOnly>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    )
}
