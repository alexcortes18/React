import { Component } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { counterActions } from '../store/index-redux-toolkit-store';
import classes from './Counter.module.css';

const Counter = () => {
  const dispatch = useDispatch();
  // const counter = useSelector(state => state.counter); // This works when we had only ONE slice
  const counter = useSelector(state => state.counter.counter); //The first counter is the key name of the slice, the second counter is the value of the counter in initialState.
  const show = useSelector(state => state.counter.showCounter);

  const incrementHandle = () => {
    dispatch(counterActions.increment()) //new way of calling actions with Redux-toolkit.
  }

  const increaseHandler = () => {
    dispatch(counterActions.increase(5))
        // Redux-toolkit handles the  former dispatch function by creating this:
    // { type: SOME_UNIQUE_IDENTIFIER, payload: 10}
  }

  const decrementHandle = () => {
    dispatch(counterActions.decrement())
  }

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter())
   };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandle}>Increment</button>
        <button onClick={increaseHandler}>Increment by 5</button>
        <button onClick={decrementHandle}>Decrement</button>
      </div>    
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};
export default Counter;



// Class based Components.
// This is to learn how to apply Redux to React based on classes (which i skipped)...
// class Counter extends Component {
//   // constructor(){} // to initialize state. No state in here.

//   incrementHandle() {
//     this.props.increment();
//    }

//   decrementHandle() {
//     this.props.decrement();
//    }

//   toggleCounterHandler() { }

//   render() {
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         <div className={classes.value}>{this.props.counter}</div>
//         <div>
//           <button onClick={this.incrementHandle.bind(this)}>Increment</button>
//           <button onClick={this.decrementHandle.bind(this)}>Decrement</button>
//         </div>
//         <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
//       </main>
//     );
//   }
// }




// for class based Components:

// functions needed to pass as arguments for connect():
// 1. mapStateToProps (name is convention).
// Receives the Redux state and then provides:
// - Keys are the names of the props received by the component,
// - Values are the logic for drilling into the Redux state.
// const mapStateToProps = state => {
//   return {
//     counter: state.counter
//   };
// }

// // Stores the dispatch as a function to the props for the Component class.
// const mapDispatchToProps = dispatch => {
//   return{
//     increment: ()=> dispatch({type: 'Increment'}),
//     decrement: ()=> dispatch({type: 'Decrement'})
//   }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(Counter);
// // connect() returns a new function which then we pass the Counter component as an argument.
// // connect() already sets up a subscription for us.
