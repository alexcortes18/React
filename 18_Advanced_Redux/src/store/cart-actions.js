// The following code was originally in cart-slice.js, but since the file is getting too big, we have outsourced it.

import { uiActions } from "./ui-slice";


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
        } catch(error){
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Sending cart data failed!',
                }));
        }
    };
};