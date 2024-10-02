import { createSlice, configureStore } from '@reduxjs/toolkit'

const initialState = { counter: 0, showCounter: true }

const counterSlice = createSlice({
    name: 'counter', // any name we want.
    initialState, // we are pointing to the constant declared before. New JS syntax.
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

// const store = createStore(counterSlice.reducer); 

const store = configureStore({
    // we can have several reducers from DIFFERENT slices in here. We will do that later.
    reducer: counterSlice.reducer //Toolkit creates a single reducer function from the methods we add 
    //to the reducers object which we pass to createSlice.
});

export const counterActions = counterSlice.actions; // actions holds the slice's reducers inside of it.
export default store;