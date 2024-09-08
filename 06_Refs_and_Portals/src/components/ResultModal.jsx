import { forwardRef, useRef, useImperativeHandle } from "react"
import { createPortal } from 'react-dom'

// When forwarding a 'ref' from another component, we HAVE to use "ref" as the prop for React to recognize it,
// such as using it in <ResultModal ref={dialog}/> in TimerChallenge.jsx. We then in this file, use forwardRef to be
// able to forward it to the 'dialog' variable. So the structure of this code changes a bit with the forwardRef
// function and it is as follows:

const ResultModal = forwardRef(function ResultModal({remainingTime, targetTime, onReset}, ref){

    const UserLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime/1000).toFixed(2);
    const score = Math.round((1 - remainingTime/(targetTime*1000)) *100);

    const dialog = useRef();
    useImperativeHandle(ref, ()=> {
        return {
            open(){
                dialog.current.showModal(); //Built-in <dialog> has a showModal() to show it. Can also use show(), but
                // just show() does not dim the background.
            }
        }
    });


    // By default the <dialog> element is invisible and to make it visible we have to use "open" attribute
    // But if we use 'open' we cannot use the background behind the <dialog> to dim our actual background.

    // So we have to open it programmatically, or by sending a command to the browser

    // <dialog> 's onClose prop is 
    return createPortal(<dialog ref={dialog} className="result-modal" onClose={onReset}>
        {UserLost && <h2>You Lost! :(</h2>}
        {!UserLost && <h2>Your Score of {score}!</h2>}
        {/* <h2>You {UserLost ? "lost" : "won"}</h2> */}
        <p>The target time was <strong>{targetTime}</strong> seconds.</p>
        <p>You stopped the timer with <strong> {formattedRemainingTime} seconds left.</strong></p>
        <form method="dialog">
            {/* A form with 'method="dialog"' and a button inside, will submit the dialog automically and close it. */}
            {/* onClick={onReset} could also have work inside the button, instead of onSubmit of the form */}
            {/* onSubmit={onReset} prop of the <form> can work but does not handle the "esc" key */}
            {/* onClose={onReset} prop of the <dialog> hanldes the "esc" key, too */}
            <button>Close</button>
        </form>
    </dialog>,
    document.getElementById("modal")
    // createPortal(), is used to move the <dialog> to a more logical place in the html, in this case in the <body>
    // element since it technically covers the whole page, and is not just besides the <section> inside the TimerChallenge
    // component. Does not affect the app, just where it is rendered in the html. We teleport it by using the 2nd argument
    // of the function and introducing the ID of the element where we want to teleport it, in this case the <div> in the
    // <body> element with ID = "modal".
    );
});

export default ResultModal;