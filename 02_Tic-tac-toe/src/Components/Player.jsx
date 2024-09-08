import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onChangeName }) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEdit() {
        setIsEditing(prevState => !prevState); //BEST PRACTICE!!!

        if (isEditing) {
            onChangeName(symbol, playerName);
        }
    }

    function handleChange(event) {
        setPlayerName(event.target.value); // event object provided by OnChange has a target.value which is what we look for.
        //target refers to the 'input' element, and value refers to the text inside it.
    }

    let editplayerName = <span className="player-name">{playerName}</span>;

    if (isEditing) {
        editplayerName = (
            <input type="text" name="Player's Name" required //required is an attribute, value another one.
                value={playerName} onChange={handleChange}></input>  // onChange triggers for every keystroke and provides us with an event object.
        );
        // using onChange to listen to the new input and instantly changing it with value={} is a TWO WAY BINDING.
    }

    return (
        <li className={isActive === true ? "active" : ""}>
            <span id="player">
                {editplayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={() => handleEdit()}>{(isEditing) ? "Save" : "Edit"}</button>
        </li>
    );
}