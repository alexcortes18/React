import { useState } from "react"

export default function NewTask({onAdd}) {

    //We are using State and not Ref because we want to reset the input field after adding the task. This 'could' also be
    //done with Ref, but we should not technically be setting the Reference value from inputs (or others) with the DOM directly.
    //Not the purpose of React. Instead we should use State, since it is mostly use the update the UI when a state changes.

    const [enteredTask, setEnteredTask] = useState("");

    function handleChange(event) { //event parameter comes directly from onChange function.
        setEnteredTask(event.target.value);
    }

    function handleClick(){
        if(enteredTask.trim()===""){
            console.log("please add some value");
            return;
        }
        onAdd(enteredTask);
        setEnteredTask("");
    }

    return (
        <div className="flex items-center gap-4">
            <input
                type="text"
                className="w-64 px-2 py-1 rounded-sm bg-stone-200"
                onChange={handleChange}
                value={enteredTask}
            >
            </input>
            <button className="text-stone-700 hover:text-stone-950" onClick={handleClick}>Add Task</button>
        </div>
    )
}