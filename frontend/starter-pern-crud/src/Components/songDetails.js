import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import srv from "../fetch_";
function SongDetails({id}) {
  let navigate = useNavigate();
  const [song, setSong] = useState({});
  useEffect(()=>{
    srv.read(id,(data)=>{
      if(data) setSong(data);
      
    })
  },[]);
  const deleteSong =()=>{
    if(window.confirm("click yes to delete"))
    {
      srv.del(id,(data)=>{
        console.log(data);
        navigate(`/songs`)
      })
    }
    
  }
  return <article>
    <p>{song.name}</p>
    <p>{song.artist}</p>
    <p>{song.album}</p>
    <p>{song.time}</p>
    <p>{song.is_favorite ? (
          <span>⭐️</span>
        ) : (
          <span></span>
        )}
    </p>
    <button onClick={()=>{navigate(`/songs/${id}/edit`)}}>edit</button>&nbsp;
    <button onClick={deleteSong}>delete</button>
  </article>;
}

export default SongDetails;
