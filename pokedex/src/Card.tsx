import { useEffect, useState } from "react";
import { getImg } from "./api";
import "./App.css";

function Card(props) {

  const [image, setImg] = useState("");

  useEffect(() =>  {
    const fetchImg = async () => {
      const res = await getImg(props.url);
      setImg(res.front_default);
  };    
    fetchImg();
  }, [props.url])
  return(
    <div className="card" onClick={props.onClick}>
      {image ? 
        <img src={image} alt={props.name}/>
        : null
      }

    </div>
  )
}

export default Card;
