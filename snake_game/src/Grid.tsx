import { useEffect, useState } from "react";
import Box from "./Box";

function Grid(props){

  const color = (color) => {
    if (color == 1){
      return "white";
    }
    else if (color == 0){
      return "red";
    }
    else return "black";
  }
  const [cellSize, setSize] = useState(0)
  
  const rows = props.matrix.length;
  const cols = props.matrix[0].length;

  useEffect(() => {
    const updateSize = () => {
      setSize(
        Math.floor(
          Math.min(
            (window.innerWidth)/rows, (window.innerHeight)/cols
          )
        )
      )
   };
    updateSize();
    window.addEventListener("resize", updateSize)

  }, [props.matrix]);


  return(
    <div>
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${props.matrix[0].length}, ${cellSize}px)`,
      }}>
        {
          props.matrix.map((row, rowindex) => (
            row.map((value, colindex) => (
              <Box 
                color={color(value)} 
                key={`${rowindex}-${colindex}`} 
                size={cellSize}/>
            ))
          ))
        }
      </div>
    </div>
  );
}

export default Grid;
