import { useEffect, useState } from "react"
import TimeFormatToggle from "./TimeFormatToggle";

function Clock(props){
  const [time, setTime] = useState(new Date());
  const [timeFormat, setTimeFormat] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
  }, 1000);
    return () => clearInterval(timer);
  }, [])

  return(
    <div> 
      <h1>Digital Clock</h1>
      <TimeFormatToggle 
        twelve={() => setTimeFormat(true)} 
        twentyFour={() => setTimeFormat(false)}/>

      <h1>{time.toLocaleTimeString([] , {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: timeFormat}
      )}</h1>
    </div>
  )
}

export default Clock;
