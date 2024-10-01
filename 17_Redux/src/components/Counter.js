import { useSelector, useDispatch } from 'react-redux';

import classes from './Counter.module.css';

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter); //useSelector subscribes for us, so no need to use the
  // the subscribe function. useSelector handles that behind the scenes and ensures your component stays in sync 
  // with the Redux state.

  const incrementHandle = () => {
    dispatch({ type: 'Increment'})
  }

  const decrementHandle = () => {
    dispatch({ type: 'Decrement'})
  }

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={incrementHandle}>Increment</button>
        <button onClick={decrementHandle}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
