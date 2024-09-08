import { useEffect, useState } from "react";

export default function ProgressBar({timer}){
    const [remainingTime, setRemainingTime] = useState(timer);

    useEffect(()=>{
        const interval = setInterval(()=>{
          console.log("Interval")
          setRemainingTime(prevTime => prevTime - 10);
        }, 10); // executes every 10 seconds.
    
        return ()=>{
          clearInterval(interval);
        }
      },[]);

    return <progress value={remainingTime} max={timer}></progress>
}