import { useEffect, useState } from "react"
import GeneralForm from "./generalForm";
import srv from "../fetch_";

export default function ArtistNewForm({ setmodalshow, setartists }) {
  const [artist] = useState({name: "", time: ""});
  useEffect(() => {
    
  }, [artist])
  const artistTemplete = {
    name: { type: "string", placeholder: "name plackholder", regex: "" },
  }
  const on_save_artist = (body)=>{
    srv.createArtist(body,(data)=>{
      data["songs"]=[];
      setartists(pv=>[data,...pv]);
      setmodalshow(false);
    })
  }
  return (<GeneralForm setupperform={on_save_artist} default_value={artist} formtemplete={artistTemplete} title="New artist" setmodalshow={setmodalshow} />)
}