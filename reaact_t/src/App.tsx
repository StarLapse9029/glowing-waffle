import './App.css'
import Board from './Board'

function App() {

  return (
    <>
      <p>Hello, World!!!</p> {/*Just a sanity check*/}
      <h1>Tic Tac Toe</h1>
      <div style={{display: "flex", justifyContent: "center"}}>
       <Board />
      </div>
    </>
  )
}

export default App
