import { useEffect, useState } from "react"
import GeneralForm from "./generalForm";
import srv from "../fetch_";

export default function PlaylistNewForm({ setmodalshow, setplaylists }) {
  const [playlist] = useState({name: "", time: ""});
  useEffect(() => {
    
  }, [playlist])
  const playlistTemplete = {
    name: { type: "string", placeholder: "name plackholder", regex: "" },
    
  }
  const on_save_playlist = (body)=>{
    srv.createPlaylist(body,(data)=>{
      data["songs"]=[];
      console.log(data,setmodalshow,setplaylists);
      setplaylists(pv=>[data,...pv]);
      setmodalshow(false);
      
    })
  }
  return (<GeneralForm setupperform={on_save_playlist} default_value={playlist} formtemplete={playlistTemplete} title="New Playlist" setmodalshow={setmodalshow} />)
}