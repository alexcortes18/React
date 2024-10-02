// const redux = require('redux');
// import redux from 'redux'
import { createStore } from 'redux'

const initialState = { counter: 0, showCounter: true }

const counterReducer = (state = initialState, action) => {
    if (action.type === "Increment") {
        // state.counter++; NEVER MUTATE the state like this. Return a brand new value to avoid
        //referencing something else.

        return {
            ...state,
            counter: state.counter + 1,
            // showCounter: state.showCounter
        }
    }
    if (action.type === "Increase") {
        return {
            counter: state.counter + action.amount,
            showCounter: state.showCounter
        }
    }
    if (action.type === "Decrement") {
        return {
            counter: state.counter - 1,
            showCounter: state.showCounter
        }
    }
    if (action.type === "Toggle") {
        return{
            showCounter: !state.showCounter,
            counter: state.counter
        }
    }

    return state;
}

const store = createStore(counterReducer);

export default store;