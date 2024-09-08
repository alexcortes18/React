import { useState, useRef } from 'react';
import ResultModal from './ResultModal';

export default function TimerChallenge({title, targetTime}){
    const timer = useRef();
    const dialog = useRef();

    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000); //initially it should be the target time and should decrease.
    // and it should be in milliseconds since setInterval() uses milliseconds.

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if(timeRemaining <=0){
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset(){
        setTimeRemaining(targetTime*1000); //reset the targetTime after clearing the interval
    }

    // Since we are changing from using setTimeout() to setInterval(), we do not longer need these:
    // const [timerStarted, setTimerStarted] = useState(false);
    // const [timerExpired, setTimerExpired] = useState(false);

    function handleStart(){
        // We will stop using setTimeout() since this does not offer how to know how much time has passed.
        // timer.current = setTimeout(()=> {
        //     setTimerExpired(true) //this code executes after the timer we set in milliseconds
        //     dialog.current.open();
        //     //what is happening here is: dialog.current.open.dialog.current.showModal()
        // }, targetTime*1000); //targetTime is in seconds

        timer.current = setInterval(()=>{
            setTimeRemaining((prevTimeRemainig)=> prevTimeRemainig - 10);
        }, 10);// now instead of executing once after the time is completed, it continue to be executed after every
        // interval of said time (in this case 10 ms);
        // setTimerStarted(true); // this executes right after calling setTimeout, does not wait the timer.
    }

    function handleStop(){
        // clearTimeout(timer.current);
        clearInterval(timer.current);
        dialog.current.open();
    }

    return <>
    {/* Since <ResultModel> is based from a <dialog> which is invisible we can set it like this, and it will only 
    pup up when we want to. */}
    <ResultModal targetTime={targetTime} remainingTime={timeRemaining} ref={dialog} onReset={handleReset}/>
    <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
            {targetTime} second{targetTime>1 ? 's': ''}
        </p>
        <p>
            <button onClick={timerIsActive ? handleStop : handleStart} >
                {timerIsActive ? 'Stop': 'Start'} Challenge
            </button>
        </p>
        <p className={timerIsActive ? "active": undefined}>
            {timerIsActive ? "Time is running...": "Timer Inactive"}
        </p>
    </section>
    </>
}