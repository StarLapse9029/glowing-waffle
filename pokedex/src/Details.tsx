import { useEffect, useState } from "react";
import { getImg, getInfo } from "./api";

function Details(props){

  const [images, setImages] = useState<string[]>([]);
  const [main, setMain] = useState("");
  const [binfo, setBinfo] = useState<string[]>([]);
  const [types, setTypes] = useState();
  const [stats, setStats] = useState();
  const [page, setPage] = useState("base");

  useEffect(() =>{
    const fetchImgs = async () => {
      const res = await getImg(props.det.url);
      const imgs = [
        res.front_default,
        res.back_default,
        res.front_shiny,
        res.back_shiny,
        //res.other["official-artwork"].front_default
      ].filter(Boolean)
      setImages(imgs);  
      setMain(imgs[0]);
    };
    const fetchData = async () => {
      const res = await getInfo(props.det.url);
      const basic_info = [
        `Id: ${res?.id}`,
        `Height: ${res?.height}`,
        `Weight: ${res?.weight}`,
        `Base Experience: ${res?.basexp}`,
      ];
      setStats(res?.stats)
      setTypes(res?.types);
      setBinfo(basic_info);
    }

    fetchImgs();
    fetchData();
  }, [props.det.url]);

  return(
    <div style={{
      display:"flex", 
      flexDirection:"column", 
      gap:"40px", 
      alignItems:"center",
    }}>
      
      <h1>{props.det.name}</h1>
      <div style={{
        display:"flex",
        gap:"60px"
      }}>
        {main ? 
          <img src={main} alt={props.det.name} 
          style={{
            transform:"scale(2.5)",
            objectFit:"contain",
            zoom:"1.3",
          }}/> 
          : null}

      
        <div>
        <div style={{display:"flex", gap:"10px", width:"130%"}}>
          <button style={{
            flex:"1",
            backgroundColor: page === "base" ? "#0a5baa" : "#dfdfdf",
            color: page === "base" ? "white" : "black",
            border: `3px solid ${page === "base" ? "white" : "#5f5f5f"}`
          }} onClick={() => setPage("base")}>Basic Info</button>
          <button style={{
            flex:"1",
            backgroundColor: page === "types" ? "#0a5baa" : "#dfdfdf",
            color: page === "types" ? "white" : "black",
            border: `3px solid ${page === "types" ? "white" : "#5f5f5f"}`

          }} onClick={() => setPage("types")}>Types</button>
          <button style={{
            flex:"1",
              backgroundColor: page === "stats" ? "#0a5baa" : "#dfdfdf",
              color: page === "stats" ? "white" : "black",
              border: `3px solid ${page === "stats" ? "white" : "#5f5f5f"}`

          }} onClick={() => setPage("stats")}>Stats</button>
        </div>
        <div style={{
            width: "130%",
            height: "250px",
            maxHeight: "50vh",
            overflowY: "auto",
            textAlign: "left",

        }}>

        {page === "base" && <div style={{}}>
          {binfo?.map((value, index) => (
            <p style={{textAlign:"left"}}key={index}>{value}</p>
          ))}
          </div>
        }
       
        {page === "types" && <div style={{
          display:"flex",
          flexDirection:"column"
        }}>
          {types?.map((value, index) => {
            return <a style={{textAlign: "left"}} 
            key={index} 
            href={value.url}>
              {value.name}  
              </a>
          })}
        </div>
        }

        {page === "stats" && <div>
          {stats?.map((value, index) => {
            return <p key={index} style={{textAlign:"left"}}>{value.stat.name}: {value.base_stat}</p>
          })}
        </div>
        }
          </div>

      </div>


      </div>
      <div style={{display:"flex", }}> 
        {images.map((value, index) => {
          return <div key={index} style={{
            border:"3px solid #5f5f5f",
            borderRadius: "10px",
          }}  
          onMouseEnter={() => setMain(value)} 
          onMouseLeave={() => setMain(images[0])}>
          <img style={{
            objectFit:"contain", 
            alignItems:"center"}} 
            src={value} alt={props.det.name}/>
          </div>
        })}

      </div>
    </div>
  );
};

export default Details;
