// The following code was originally in cart-slice.js, but since the file is getting too big, we have outsourced it.

import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

// This is a Action Creator Thunk. 
// A normal JS action creator is one that returns a JS object with a 'type' and 'payload'.
// A Thunk is a function that returns a function.
// In this case this Thunk does not return a {type: '...', payload: '...'}, but instead returns another function
// which Immer (library that redux toolkit uses) then provides the dispatch object (function) to that we can use
// it to ourselves use dispatch. And we can inside this thunk function, finally do our HTTP logic.
// It is safe to say that we don't really need to return a function, and could try to make the logic ourselves,
// but apparently thunks give you more flexibility and control when dealing with complex asynchronous operations and 
// help keep your code organized.
export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: 'pending',
                title: 'Sending...',
                message: 'Sending cart data!',
            }));

        const sendRequest = async () => {
            const response = await fetch(
                'https://react-http-ab40a-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',
                {
                    method: 'PUT', // to replace data instead of creating a new resource in the server (POST).
                    body: JSON.stringify(cart)

                    // if we dont want to send the whole cart data, like for example including the "changed" 
                    // property, which only helps us locally. then we can send only the one we want:
                    // body: JSON.stringify({item: cart.items, totalQuantity: cart.totalQuantity})
                });

            if (!response.ok) {
                throw new Error('Sending cart data failed');
            }
        };
        try {
            await sendRequest();
            dispatch(
                uiActions.showNotification({
                    status: 'success',
                    title: 'Success!',
                    message: 'Sent cart data successfully!',
                }));
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Sending cart data failed!',
                }));
        }
    };
};

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            // When using PUT, and then retrieving the data, we typically send the entire resource, so when
            // we retrieve it, we can just retrieve it without any extra steps to make it usable in JS code.
            // This is unlike retrieving data after a POST, which would need to do some manipulation to use it.
            const response = await fetch(
                'https://react-http-ab40a-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json'
            ); // a GET

            if (!response.ok) {
                throw new Error('Could not fetch cart data!');
            }
            const data = await response.json();
            return data;
        }

        try {
            const cartData = await fetchData();
            // dispatch(cartActions.replaceCart(cartData));
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],  // to avoid error if we fetch after deleting all items.
                totalQuantity: cartData.totalQuantity
            }))
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Fetching cart data failed!',
                }));
        }
    }
};