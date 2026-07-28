import { useEffect, useRef, useState } from "react";
import { getPokemon } from "./api";
import type { pokemon } from "./types";
import Card from "./Card";
import "./App.css"
import Details from "./Details";

function App(){
  const [details, setDetails] = useState<pokemon>();
  const [page, setPage] = useState(0);
  const [data, setData] = useState<pokemon[]>([]);
  const handle_update = async () => {
    const response = await getPokemon(page);
    if (response === null){
      return;
    }
    setData(response);
  }
  const next_page = () => {
    setPage(prev => prev+1);
  }
  const prev_page = () => {
    if (page > 0){
      setPage(prev => prev-1)
    };
  }
  useEffect(() => {
    handle_update();
  }, [page])

  return (
    <div>
      <button onClick={prev_page}>Previous</button>
      <button onClick={next_page}>Next</button>
      <p>Showing: {page*20}-{(page+1)*20}</p>
      <div className="clssName">
        <div className="cardContainer">{data.map((value, index) => {
          return <Card key={index} 
            name={value.name} 
            url={value.url}
            onClick={() => {setDetails({name: value.name, url: value.url})}}/>
          })
        }</div>
        <div className="placeholder" >
        {details ? null : <h1>placeholder</h1>}
        {details ? <Details det={details}/> : null}
        </div>
      </div>
    </div>
  )
}

export default App;
