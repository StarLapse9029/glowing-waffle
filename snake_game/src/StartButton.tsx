
function StartButton({start}: ButtonProps){
  
  return(
    <div
      style={{
        position: "relative"
      }}>
      <button style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}
      onClick={start}>Start</button>
    </div>
  )
}

export default StartButton;
