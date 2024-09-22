import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { }
});

// the state is provided by REACT in useReducer, but the action is usually an {} object, we provide in our functions,
// which should contain "type" and "item" in this case: {type: ..., item: ...}, or {type: ..., id: ...}, etc...
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

        return { ...state, items: updatedItems }
    }
    if (action.type === 'REMOVE_ITEM') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id);
        const existingCartItem = state.items[existingCartItemIndex];

        const updatedItems = [...state.items];
        if (existingCartItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1); //remove 1 item from the index existingCartItemIndex.
        } else {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1
            }
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return{
            ...state,
            items: updatedItems
        }

    }
    return state;
}

export function CartContextProvider({ children }) {
    const [cart, dispatchCartAction] = useReducer(cartReducer,
        // Everything in here is the state that useReducer provides to us: (in this case we only have items array)
        {
            items: []
        });

        
        function addItem(item){
            dispatchCartAction({type: 'ADD_ITEM', item: item})
        }
        
        function removeItem(id){
            dispatchCartAction({type: 'REMOVE_ITEM', id: id})
        }
        
        const cartCtx = {
            items: cart.items,
            addItem, // since they have the same name we can avoid-> addItem: addItem.
            removeItem,
        }

    return <CartContext.Provider value={cartCtx}>{children}</CartContext.Provider>
}

export default CartContext;