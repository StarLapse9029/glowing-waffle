import { useEffect, useRef, useState } from "react";

function Stopwatch(){
  const [sw, setState] = useState(false);
  const [time, setTime] = useState(0);
  const cref = useRef(0);
  const startRef = useRef(0);

  useEffect(() => {
    if(sw){     
      cref.current = time;
      startRef.current = performance.now()
      const interval = setInterval(() => {
        setTime(cref.current + performance.now() - startRef.current);
      }, 10);
      return () => clearInterval(interval);
    }
  }, [sw])

  const resetClock = () => {
    setState(false);
    setTime(0);
    cref.current = 0;
  };
  const formatTime = () => {
    const milliseconds = Math.floor((time % 1000));
    const seconds = Math.floor((time / 1000) % 60)
    const minutes = Math.floor(time / 60000);   

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}:${String(milliseconds).padStart(3, "0")}`;
  };

  return(
    <div>
      <h1>Stopwatch</h1>
      <h1>{formatTime()}</h1>
       <button onClick={() => setState(prev => !prev)}>
        {sw ? "Stop" : "Start"}</button>
       <button onClick={resetClock}>Reset</button> 
    </div>
  )
}

export default Stopwatch;
