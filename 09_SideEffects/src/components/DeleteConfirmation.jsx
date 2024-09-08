import { useEffect } from "react";
import ProgressBar from "./ProgressBar";

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {

  useEffect(() => {
    console.log("Timer set")
    const timeout = setTimeout(() => {
      onConfirm();
    }, TIMER);

    // UseEffect can also return a "clean-up" function that runs in TWO cases:
    // 1. Before the useEffect gets called again (if we have dependencies)
    // 2. And when the overall component it is contained within, is removed (DeleteConfirmation in this case, when we click
    // onCancel or onConfirm buttons, which both close up the dialog (by: dialog.current.close() )).
    return () => {
      console.log("Cleaning up Timer")
      clearTimeout(timeout);
    }
  }, [onConfirm]);


  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar timer={TIMER}></ProgressBar>
    </div>
  );
}
