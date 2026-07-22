import './App.css'
import Grid from './Grid'
import { useEffect, useState, useRef } from 'react';

type Pos = {
  x: number;
  y: number;
};

function App() {
  const size = 15;
  const speed = 250; 
  const randPos = () => {
    return {
      x: Math.floor(Math.random()*size),
      y: Math.floor(Math.random()*size)
    };
  };
  const createMatrix = (x: number, y = 3) => {
    return Array.from({ length: x }, () => {
      return Array.from({ length: x }, () => y);
    });
  };
  
  const fruit = useRef<Pos>(randPos());
  const ate = useRef(false);
  const [state, setState] = useState(createMatrix(size));
  const direction = useRef({x: 0, y: 1});
  const snake = useRef<Pos[]>([{x: Math.floor(size/2), y: Math.floor(size/2)},]);
  const update = () => {
    const newBoard = createMatrix(size);
    if(snake.current[0].x == fruit.current.x 
       && snake.current[0].y == fruit.current.y){
        eat()
       };
    moveSnake(); 
    for(const i of snake.current){
      newBoard[i.x][i.y] = 1;
    }
    newBoard[fruit.current.x][fruit.current.y] = 0;
    setState(newBoard);
  };

  const moveSnake = () => {
    const currentHead = snake.current[0];
    const newHead = {
      x: (currentHead.x + direction.current.x + size) % size,
      y: (currentHead.y + direction.current.y + size) % size,
    };
    if (selfCollision(newHead)) {
      reset();
    }
    snake.current.unshift(newHead);
    if (!ate.current){
      snake.current.pop();
    };
    ate.current = false;

  };

  const selfCollision = (head: Pos) => {
  return snake.current.some(
    segment => segment.x === head.x && segment.y === head.y
  );
};

  const eat = () => {
    ate.current = true;
    let x: number;
    let y: number;

    do {
      ({x, y} = randPos());
    } while (
      snake.current.some(segment => segment.x === x && segment.y === y)
    );

    fruit.current = { x, y };
  };
const reset = () => {
  ate.current = false;

  const start = {
    x: Math.floor(size / 2),
    y: Math.floor(size / 2),
  };

  snake.current = [start];
  console.log(snake.current)
  fruit.current = randPos();
  direction.current = { x: 0, y: 1 };

  const newBoard = createMatrix(size);
  newBoard[start.x][start.y] = 1;
  newBoard[fruit.current.x][fruit.current.y] = 0;

  setState(newBoard);
  return;
};

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
        case "w":
          if(direction.current.x !== 1){
            direction.current = {
              y: 0,
              x: -1
            };
          };
          break;

        case "ArrowDown":
        case "s":
          if (direction.current.x !== -1){
            direction.current = {
              y: 0,
              x: 1
            };
          };
          break;

        case "ArrowLeft":
         case "a":
          if (direction.current.y !== 1){
             direction.current = {
              y: -1,
              x: 0
            };
          };
          break;

        case "ArrowRight":
        case "d":
          if (direction.current.y !== -1){
            direction.current = {
              y: 1,
              x: 0
            };
          };
          break;
        
        default:
          break;
      }
    }
    const interval = setInterval(() => {
      update();
    }, speed);

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, []);


  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <button onClick={reset}>Reset</button>
      <Grid matrix={state}/>
    </div>
  )
}

export default App
