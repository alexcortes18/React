import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeout, mode }) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    // setTimeout needs an useEffect because if not it gets re-executed a lot of times because of setInterval (and
    // subsequently setRemainingTime) which will update the state "remainingTime" and cause the QuestionTimer to
    // get re-executed.
    useEffect(() => {
        console.log('Setting Timeout')
        const timer = setTimeout(onTimeout, timeout); //after timeout finishes, the onTimeout function gets executed. Comes as a prop

        return ()=>{
            clearTimeout(timer);
        }

    }, [onTimeout, timeout]); // in here we need to add the dependencies (props, states, or values depending on those)

    // in here also another useEffect because setRemainingTime makes the UI change and re-execute QuestionTimer.
    useEffect(() => {
        console.log('Setting Interval')
        const interval = setInterval(() => {
            setRemainingTime(prevTime => prevTime - 10);
        }, 10);

        // Cleanup Function:
        // This gets run BEFORE it runs the useEffect function again, or it gets unmounted from the DOM (QuestionTimer)
        return () => {
            clearInterval(interval);
        };
    }, []);

    return <progress id="question-time" max={timeout} value={remainingTime} className={mode}></progress>
}