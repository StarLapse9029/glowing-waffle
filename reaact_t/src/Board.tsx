import { useState } from "react";
import X from "./X";
import O from "./O";
import "./Board.css";

function Board() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(false);
  const [win, setWin] = useState(null)

  const handleClick = (position) => {
    if(win !== null){
      return;
    }
    if (board[position] != null){
      return
    }
    const newBoard = board;
    newBoard[position] = turn;
    setBoard(newBoard)
    checkWin();
    setTurn(prev => !prev);
  }

  const reset = () => {
    setBoard(Array(9).fill(null));
    setTurn(false);
    setWin(null);  
  }
  
  const winPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const checkWin = () => {
    winPositions.forEach((x) => {
      if(board[x[0]] === null && board[x[1]] === null && board[x[2]] ===null){
        return;
      }
      if(board[x[0]] === board[x[1]] && board[x[1]] === board[x[2]]){
        setWin(board[x[0]]);
        alert(`Winner: ${turn ? "X" : "O"}`);
      }
    })
  }


  return(
    <div className="gameContainer">
      <div className="boardContainer">
      {board.map((element, index) => (
        <button key={index} onClick={() => handleClick(index)}>
          {element === null ? null : element ? <X /> : <O />}
        </button>
      ))
      }</div>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

export default Board;
