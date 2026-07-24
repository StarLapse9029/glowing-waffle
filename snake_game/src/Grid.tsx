import { useEffect, useState } from "react";
import Box from "./Box";

type GridProps = {
  matrix: number[][];
};

function Grid(props: GridProps){

  const color = (color: number) => {
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
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };

  }, []);


  return(
    <div style={{width: "70%", height: "70%"}}>
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${props.matrix[0].length}, ${cellSize}px)`,
      }}>
        {
          props.matrix.map((row: number[], rowindex: number) => (
            row.map((value: number, colindex: number) => (
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
