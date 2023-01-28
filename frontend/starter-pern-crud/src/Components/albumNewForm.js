import { useEffect, useState } from "react"
import GeneralForm from "./generalForm";
import srv from "../fetch_";

export default function AlbumNewForm({ setmodalshow, setalbums }) {
  const [album] = useState({name: "", time: ""});
  useEffect(() => {
    
  }, [album])
  const albumTemplete = {
    name: { type: "string", placeholder: "name plackholder", regex: "" },
    time: { type: "string", placeholder: "time plackholder", regex: "" },
  }
  const on_save_album = (body)=>{
    srv.createAlbum(body,(data)=>{
      data["songs"]=[];
      setalbums(pv=>[data,...pv]);
      setmodalshow(false);
    })
  }
  return (<GeneralForm setupperform={on_save_album} default_value={album} formtemplete={albumTemplete} title="New Album" setmodalshow={setmodalshow} />)
}