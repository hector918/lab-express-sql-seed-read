import { useEffect, useState } from "react";

export default function PlaylistSongsImportForm({selectedPlaylist,selectedsongs,selectedalbums,selectedartists,setmodalshow,on_import_save}) {
  const [fromSongs, setFromSongs] = useState(true);
  const [fromAlbum, setFromAlbum] = useState(true);
  const [fromArtist, setFromArtist] = useState(true);
  useEffect(()=>{
    document.querySelector("#playlist-import-form-modal-id").classList.add("active");
  },[])
  //////////////////////////////////////////////////////////
  function on_close(evt){
    document.querySelector("#playlist-import-form-modal-id").classList.remove("active");
    setTimeout(() => {
      setmodalshow(false);
    }, 500); 
  }
  function on_checkbox_click(evt){
    switch(evt.currentTarget.getAttribute("from")){
      case "songs":
        setFromSongs(pv=>!pv);
      break;
      case "album":
        setFromAlbum(pv=>!pv);
      break;
      case "artist":
        setFromArtist(pv=>!pv);
      break;
      default:
        return;
    }
  }
  function on_save(){
    let songs = [];
    if(fromSongs){
      songs = songs.concat(selectedsongs.map(el=>({song_id:el.id,playlist_id:selectedPlaylist['id']})));
    }
    if(fromAlbum) for(let x of selectedalbums){
      songs = songs.concat(x.songs.map(el=>({song_id:el.id,playlist_id:selectedPlaylist['id']})))
    }
    
    if(fromArtist) for(let x of selectedartists){
      songs = songs.concat(x.songs.map(el=>({song_id:el.id,playlist_id:selectedPlaylist['id']})));
    }
    on_import_save(songs)
  }
  return (
    <div className="modal modal-lg" id="playlist-import-form-modal-id">
      <div href="#close" className="modal-overlay" aria-label="Close"></div>
      <div className="modal-container">
        <div className="modal-header">
          <div href="#close" className="btn btn-clear float-right" aria-label="Close" onClick={on_close}></div>
          <div className="modal-title h5">Import to [ {selectedPlaylist.name} ] songs from selected column</div>
        </div>
        <div className="modal-body">
          <div className="content "><div className="columns">
            {selectedsongs.length > 0?<div className="column col">
              <div className="panel">
                <div className="panel-header">
                  <div className="form-group">
                    <label className="form-checkbox form-inline">
                      <input type="checkbox" from="songs" onChange={on_checkbox_click} checked={fromSongs}/>
                      <i className="form-icon"></i>
                      <span className=" text-gray">From songs</span>
                    </label>
                  </div>
                </div>
                <div className="panel-body">
                  {selectedsongs.map((el,idx)=><li key={idx}>{el.name}</li>)}
                </div>
              </div>
            </div>:""}
            {selectedalbums.length > 0?selectedalbums.map((el,idx)=>
            <div key={idx} className="column col">
              <div className="panel">
                <div className="panel-header">
                  <div className="form-group">
                    <label className="form-checkbox form-inline">
                      <input type="checkbox" from="album" onChange={on_checkbox_click} checked={fromAlbum}/>
                      <i className="form-icon"></i>
                      <span className=" text-gray">From album</span>
                    </label>
                  </div>
                </div>
                <div className="panel-nav">
                  {selectedalbums.name}
                </div>
                <div className="panel-body">
                  {el.songs.map((el,idx)=><li key={idx}>{el.name}</li>)}
                </div>
              </div>
            </div>):""}
            {selectedartists.length > 0?selectedartists.map((el,idx)=>
            <div key={idx} className="column col">
              <div className="panel">
                <div className="panel-header">
                  <div className="form-group">
                    <label className="form-checkbox form-inline">
                      <input type="checkbox" from="artist" onChange={on_checkbox_click} checked={fromArtist}/>
                      <i className="form-icon"></i>
                      <span className=" text-gray">From artist</span>
                    </label>
                  </div>
                </div>
                <div className="panel-nav">
                  {selectedartists.name}
                </div>
                <div className="panel-body">
                  {el.songs.map((el,idx)=><li key={idx}>{el.name}</li>)}
                </div>
              </div>
            </div>):""}
          </div></div>
        </div>
        <div className="modal-footer">
        <div className="btn-group btn-group-block">
          <button className="btn" onClick={on_save}>import</button>
          <button className="btn" onClick={on_close}>close</button>
        </div> 
        </div>
      </div>
    </div>
  )
}