import { createContext, useState, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext = createContext({
    items: [],
    addItemToCart: () => { }, //This function will not get used but it is to help with auto-completion. This function is set in the
    // App Component inside the 'ctxValue'. It was later moved into CartContextProvider of this same file.
    updateItemQuantity: () => { },
});

// The logic in this function was first in the App Component, but since we want to make it leaner (App Component) this can
// and should be outsourced in here, when we are managing context and its related state and functions.

function shoppingCartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        const updatedItems = [...state.items];

        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload
        );
        const existingCartItem = updatedItems[existingCartItemIndex];

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
            updatedItems.push({
                id: action.payload,
                name: product.title,
                price: product.price,
                quantity: 1,
            });
        }
        return {
            ...state, //not needed here because we have only one value, but in more complex states it is needed.
            items: updatedItems,
        };
    }

    if (action.type === "UPDATE_ITEM") {
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.productId
        );

        const updatedItem = {
            ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += action.payload.amount;

        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
            ...state,
            items: updatedItems,
        };
    }
    return state;
}

export default function CartContextProvider({ children }) {
    const [shoppingCartState, shoppingCartDispatch] = useReducer(
        shoppingCartReducer,
        {
            items: [],
        });

    /* useReducer is sometimes preferred over useState if we are repeating some code like the 
    setShoppingCart((prevShoppingCart) => {}... or it gets complex... */

    // const [shoppingCart, setShoppingCart] = useState({
    //     items: [],
    // });

    function handleAddItemToCart(id) {
        shoppingCartDispatch({
            // These both (type and payload) are for the "action" parameter of the function shoppingCartDispatch()
            type: "ADD_ITEM",
            payload: id
        })

        // setShoppingCart((prevShoppingCart) => {
        // In here before was the code now used in shoppingCartReducer().
        // });
    }

    function handleUpdateCartItemQuantity(productId, amount) {
        shoppingCartDispatch({
            type: "UPDATE_ITEM",
            payload: { productId: productId, amount: amount }
        })

        // setShoppingCart((prevShoppingCart) => {
            //code move to shoppingCartDispath()
        // });
    }

    const ctxValue = {
        items: shoppingCartState.items,
        addItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateCartItemQuantity,
    }

    return <CartContext.Provider value={ctxValue}>
        {children}
    </CartContext.Provider>
}