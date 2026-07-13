import React, {useState} from "react";

function MyComponent() {
  const dices = [2, 4, 6, 8, 10, 12, 20, 100];
  const [hist, setHist] = useState([]);
  const [count, setCount] = useState(0);
  const [roll, setRoll] = useState();
  const rollDie = (side) => {return (Math.floor(Math.random() * (1000000 * side)) % side)+ 1}
  const reRoll = () => {
    const newRoll = rollDie(sides);
    const current = count + 1;
    setRoll(newRoll);
    setCount(current);
    setHist(prev => [...prev, {count: current, result: newRoll, side: sides}]);
  }
  const [sides, setSides] = useState();

  
  
  return(
    <div>
      <div>
        <p>Select Dice:</p>
        <div>
        {dices.map((element) => {
          return(
            <button key={element} onClick={() => setSides(element)}>D{element}</button>
          )
          })
        }
        </div>
      </div>
      {sides ? 
        <div>
          <p>{roll ? roll : "Click to Roll"}</p>
          <button onClick={reRoll}>Roll D{sides}</button>
        </div>
      : null
      }
      <div>
        {hist.slice(-10).map((item, index) => 
          <p key={index}>{item.count} - D{item.side}: {item.result}</p>)}
      </div>

    </div>
  )
}

export default MyComponent
