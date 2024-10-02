import { createSlice, configureStore } from '@reduxjs/toolkit'

/*
Redux toolkit helps us with leaner and more efficient/readable code than standard Redux.
For example, NOW we can mutate (or change) directly in our reducers, instead of returning a brand new value.
Also we do not have to specify a 'type' when trying to dispatch. Instead we can call the name of the 
actions (reducers) by exporting the Slice.actions, and then using it in another file.
*/

// YOU CAN put each slice in a new file and then the configureStore in the main store file, then just import
// the slices (or the slice.reducer) and use it in the index.js file or wherever you have the configureStore.
// I am just skipping it for now.

const initialCounterState = { counter: 0, showCounter: true }
const counterSlice = createSlice({
    name: 'counter', // any name we want.
    initialState: initialCounterState, // we are pointing to the constant declared before. New JS syntax.
    reducers: {
        increment(state) {
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        },
        increase(state, action) {
            state.counter = state.counter + action.payload; //payload is the name of the property created by toolkit,
            // when we pass an argument to the function counterActions.increase(10) in Counter.js
        },
        toggleCounter(state) {
            state.showCounter = !state.showCounter;
        }
    }
});

const initialAuthState = { isAuthenticated: false };

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        }
    }
});

const store = configureStore({
    reducer: { // Only one root reducer, which can take ONE reducer function (if we only had 1 slice), such as 'reducer: counterSlice.reducer', OR a map of reducers functions.
        counter: counterSlice.reducer, //Toolkit creates a single reducer function from the methods we add to the reducers object which we pass to createSlice.
        auth: authSlice.reducer
    }
    // If we have more than 1 slice, we can map all the reducers from each slice in a "reducer" object.
});

export const counterActions = counterSlice.actions; // actions holds the slice's reducers inside of it.
export const authActions = authSlice.actions;
export default store;