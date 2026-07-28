import type { pokemon } from "./types";


export async function getPokemon(offset: number = 0): Promise<pokemon[]>{
  const url = new URL("https://pokeapi.co/api/v2/pokemon/");
  url.searchParams.set("limit", "20");
  url.searchParams.set("offset", `${offset * 20}`);
  const response = await fetch(url);
  if (response.ok){
    const data = await response.json();
    return data.results;
  }
  throw new Error(`Request error: ${response.status}`);
}

export async function getImg(url: URL){
  const response = await fetch(url);
  if (response.ok){
    const data = await response.json();
    return data.sprites;
  }
  throw new Error(`Request Error: ${response.status}`)
}

export async function getInfo(url: URL){
  const response = await fetch(url);
  if (response.ok){
    const data = await response.json();
    const info = {
      id: data.id,
      height: data.height,
      weight: data.weight,
      types: data.types.map((x) => (x.type)),
      basexp: data.base_experience,
      stats: data.stats,
    };
    console.log(data.stats);
    return info;
  }
}
