import { useState, useRef } from "react";

export default function Player() {
  const playerName = useRef();
  const [enteredPlayerName, setEnteredPlayerName] = useState(null);

  // THIS is no longer needed when we have the "ref":

  // const [submitted, setSubmitted] = useState(false);
  // function handleChange(event){
  //   setSubmitted(false)
  //   setEnteredPlayerName(event.target.value)
  // }

  function handleClick(){
    // setSubmitted(true);
    setEnteredPlayerName(playerName.current.value);
    playerName.current.value = ''; // This is more imperative code and not declarative and should no be used often. Since
    // idea of React is to use declarative code. Since its just small part it is ok, for now.
  }

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? 'unknown entity'}</h2> 
      <p>
        <input 
        ref={playerName} 
        type="text" 
        // onChange={handleChange} 
        // value={enteredPlayerName}
        />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
