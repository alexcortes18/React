// const redux = require('redux');
// import redux from 'redux'
import { createStore } from 'redux'

const counterReducer = (state = { counter: 0 }, action) => {
    if (action.type === "Increment") {
        return {
            counter: state.counter + 1
        }
    }
    if (action.type === "Decrement") {
        return {
            counter: state.counter - 1
        }
    }
    return state;
}

const store = createStore(counterReducer);

export default store;