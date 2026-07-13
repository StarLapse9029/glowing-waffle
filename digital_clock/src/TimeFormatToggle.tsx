
function TimeFormatToggle({twelve, twentyFour}: ButtonProps){
  
  return(
    <div>
      <button onClick={twelve}>12 Hour</button>
      <button onClick={twentyFour}>24 Hour</button>
    </div>
  )
}

export default TimeFormatToggle;
