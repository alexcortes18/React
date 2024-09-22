import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { }
});

function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        // Find if the item already has been added for the first time.
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id);

        const updatedItems = [...state.items];

        if (existingCartItemIndex > -1) { // If we found an item:
            const existingItem = state.items[existingCartItemIndex]
            const updatedItem = {
                ...existingItem, // we are spreading the properties of only the one item we found.
                quantity: existingItem.quantity + 1
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else { // If we DIDN'T find an item:
            updatedItems.push({ ...action.item, quantity: 1 });
        }

        return {...state, items: updatedItems}
    }
    if (action.type === 'REMOVE_ITEM') {
        // ... remove an item
    }
    return state;
}

export function CartContextProvider({ children }) {
    useReducer(cartReducer,
        // Everything in here is the state that useReducer provides to us: (in this case we only have items array)
        {
            items: []
        });


    return <CartContext.Provider>{children}</CartContext.Provider>
}

export default CartContext;