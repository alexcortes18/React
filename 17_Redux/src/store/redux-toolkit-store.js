// const redux = require('redux');
// import redux from 'redux'
import { createStore } from 'redux'
import { createSlice } from '@reduxjs/toolkit'

const initialState = { counter: 0, showCounter: true }

const counterSlice = createSlice({
    name: 'counter',
    initialState, // we are pointing to the constant declared before. New JS syntax.
    reducers: {
        increment(state) {
            state.counter++;
         },
        decrement(state) {
            state.counter--;
         },
        increase(state, action) {
            state.counter = state.counter + action.amount;
         },
        toggleCounter(state) {
            state.showCounter = !state.showCounter;
         }
    }
});

const store = createStore(counterReducer);

export default store;