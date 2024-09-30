const redux = require('redux'); //JS way of importing redux.
// const { legacy_createStore: createStore } = require('redux'); // to avoid having a deprecated warning for createStore.


const counterReducer = (state = { counter: 0 }, action) => {
    if (action.type === 'increment') {
        return {
            counter: state.counter + 1
        };
    }
    if (action.type === 'decrement') {
        return {
            counter: state.counter - 1
        };
    }
    return state;
};

const store = redux.createStore(counterReducer);

// const counterSubscriber = () => {
//     const latestState = store.getState();
//     console.log(latestState);
// };
// store.subscribe(counterSubscriber);

store.subscribe(() => {
    const latestState = store.getState();
    console.log(latestState);
});

store.dispatch({ type: 'increment' });
store.dispatch({ type: 'decrement' });