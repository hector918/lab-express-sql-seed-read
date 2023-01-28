import { useState } from "react";
import GeneralForm from "./generalForm";
import srv from "../fetch_";
import {get_all_selected_albums} from "../gerenal_func";
function Albums({ albums,setalbums,albumEditable }) {
  const [albumEditModalShow,setAlbumEditModalShow] = useState(false);
  const [gf, setGF] = useState(<></>);

  ///////////////////////////////////////////////
  function on_edit_click(evt){
    //
    let album_idx = evt.currentTarget.getAttribute("album_idx");
    let album_data = albums[album_idx];
    let albumTemplete = {
      name: { type: "string", placeholder: "name plackholder", regex: "" },
      time: { type: "string", placeholder: "time plackholder", regex: "" },
    }
    setGF(<GeneralForm setupperform={on_save_album} default_value={album_data} formtemplete={albumTemplete} title="Edit Album" setmodalshow={setAlbumEditModalShow} />);
    setAlbumEditModalShow(true);
    ////////////////////////////////////////
    function on_save_album(body){
      delete body['songs'];
      srv.updateAlbum(body.id,body,(data)=>{
        data["songs"] = albums[album_idx].songs;
        albums[album_idx] = data;
        setalbums([...albums]);
        setAlbumEditModalShow(false);
      })
    }
  }
  ///event///////////////////////////////////////////////////////
  function on_delete_click(evt){
    let album_idx = evt.currentTarget.getAttribute("album_idx");
    let confirm = window.confirm("Click yes to confirm delete");
    if(confirm){
      srv.deleteAlbum(albums[album_idx].id, (data)=>{
        albums.splice(album_idx,1);
        setalbums([...albums]);
      })
    }
  }
  function on_album_div_click(evt){

    get_all_selected_albums().forEach(el=>{
      el.classList.remove("bg-primary");
    })
    evt.currentTarget.classList.add("bg-primary");
  }
  
  //////////////////////////////////////////////////////////////
  return (
    <>
      <div id="albums_div" className="d-block s-rounded">
        {albums.map((album,idx) => {
          return <div key={album.id} album_id={album.id} className="accordion" onClick={on_album_div_click}>
          <input type="checkbox" id={`album-${album.id}`} className="accordion-checkbox" hidden style={{display:"none"}}/>
          <div className="accordion-header">
            <i className="icon icon-arrow-right mr-1" ></i>
            <label className="d-inline-block c-hand" htmlFor={`album-${album.id}`}>
              <span>{album.name}</span> - <span>{album.time}</span>
            </label> 
            <span>{albumEditable?<><i className="icon icon-edit text-warning mx-2 c-hand" album_idx={idx} onClick={on_edit_click}></i><i className="icon icon-cross text-error c-hand" album_idx={idx} onClick={on_delete_click}></i></>:""}</span>
          </div>
          <div className="accordion-body">
            <ol>
              {album.songs.map((song,idx)=>{
                return <li key={idx}>{song.name}</li>
              })}
            </ol>
          </div>
        </div>
        })}
        {albumEditModalShow?gf:""}

      </div>
    </>
  );
}

export default Albums;
