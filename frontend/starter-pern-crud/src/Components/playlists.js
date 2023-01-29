import PlaylistSongsImportForm from "./playlistSongsImportForm"
import { useState } from "react";
import {get_all_selected_albums,get_all_selected_songs,get_all_selected_artists} from "../gerenal_func";
import srv from "../fetch_";
export default function Playlists({playlists, setplaylists, playlistEditable,songs,albums,artists}){
  const [playlistImportModal, setPlaylistImportModal] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState({});
  const [selectedSongs, setSelectedSongs] = useState({});
  const [selectedAlbums, setSelectedAlbums] = useState({});
  const [selectedArtists, setSelectedArtists] = useState({});

  function nodeslist_to_array(nodes){
    let ret = [];
    nodes.forEach(el=>{
      ret.push(el);
    })
    return ret;
  }
  ////////////////////////////////////////////////
  function on_import_click(evt){
    setSelectedPlaylist(playlists[evt.currentTarget.getAttribute("playlist_index")]);

    setSelectedSongs(get_all_selected_songs().map(el=>songs[Number(el)]));

    let albums_ = nodeslist_to_array(get_all_selected_albums()).map(el=>el.getAttribute("album_id"));
    setSelectedAlbums(albums_.map(el=>albums.find(fel=>fel.id.toString()===el)));

    let artists_ = nodeslist_to_array(get_all_selected_artists()).map(el=>el.getAttribute("artist_id"));
    setSelectedArtists(artists_.map(el=>artists.find(sel=>sel.id.toString()===el)));

    setPlaylistImportModal(true);
  }
  function on_import_save(songs){
    
    srv.addSongToPlaylist(songs,(data)=>{
      if(Array.isArray(data))
      {
        playlists[playlists.findIndex(el=>el.id===selectedPlaylist.id)].songs.push(...data);

        setplaylists([...playlists]);
      }
      setPlaylistImportModal(false);
    })
  }
  function on_delete_click(evt){
    let playlist_index = evt.currentTarget.getAttribute("playlist_index");
    let playlist_id = playlists[playlist_index].id;
    
    srv.deletePlaylist(playlist_id,(data)=>{
      if(data.id.toString() === playlist_id.toString()){
        playlists.splice(playlists.findIndex(el=>el.id===playlist_id),1);
        setplaylists([...playlists]);
      }
    })
  }
  function star_on_click(evt){
    //setStarPlaylist
    srv.setStarPlaylist(evt.currentTarget.getAttribute("link_id"),{"is_favorite":evt.currentTarget.getAttribute("is_favorite")==="true"?false:true},(data)=>{
      //
      
      // evt.currentTarget.setAttribute("is_favorite",data.is_favorite.toString);
      let playlist_index = playlists.findIndex(el=>el.id===data.playlist_id);
      let song_id = playlists[playlist_index].songs.findIndex(el=>el.link_id===data.id);
      playlists[playlist_index].songs[song_id].is_favorite = data.is_favorite;
      setplaylists([...playlists]);
    })
  }
  ////////////////////////////////////////////////
  return (
    <div>
      {playlists.map((el,idx)=>{
        return <div key={el.id} className="card m-2">
          {/* <div className="card-image">
            <img src="img/osx-el-capitan.jpg" class="img-responsive">
          </div> */}
          <div className="card-header">
          <div className="card-subtitle text-gray">{el.name}</div>
            {/* <div className="card-title h5">...</div> */}
          </div>
          <div className="card-body">
            {el.songs.map((sel,sidx)=><p key={sidx}>
              <span className="text-large c-hand" is_favorite={sel.is_favorite.toString()} link_id={sel.link_id} onClick={star_on_click}>{sel.is_favorite.toString()==="true"?"⭐":"★"}</span> {sel.name}
            </p>)}
          </div>
          <div className="card-footer">
            {playlistEditable?<div className="btn-group btn-group-block">
              <button className="btn btn-sm" playlist_index={idx} onClick={on_import_click}>Import songs from selected</button>
              <button className="btn btn-sm text-error" playlist_index={idx} onClick={on_delete_click}>delete</button>
            </div> :""}
          </div>
        </div>
      })}
      
      {playlistImportModal?<PlaylistSongsImportForm selectedPlaylist={selectedPlaylist} selectedsongs={selectedSongs} selectedalbums={selectedAlbums} selectedartists={selectedArtists} setmodalshow={setPlaylistImportModal} on_import_save={on_import_save}/>:""}
    </div>
  )
}