import { useState, useEffect } from "react";
import Songs from "../Components/songs";
import Albums from "../Components/albums";
import Artists from "../Components/artists";
import srv from "../fetch_";
import AlbumNewForm from "../Components/albumNewForm";
import ArtistNewForm from "../Components/artistNewForm";
import PlaylistNewForm from "../Components/playlistNewForm";

import {get_all_selected_albums,get_all_selected_songs,get_all_selected_artists} from "../gerenal_func";
import Playlists from "../Components/playlists";

function Index() {
  const [songs_col_show, set_songs_col_show] = useState(true);
  const [albums_col_show, set_albums_col_show] = useState(false);
  const [artists_col_show, set_artists_col_show] = useState(false);
  const [playlists_col_show, set_playlists_col_show] = useState(true);
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [albumEditable, setAlbumEditable] = useState(false);
  const [albumFormShow, setAlbumFormShow] = useState(false);
  const [artistEditable, setArtistEditable] = useState(false);
  const [artistFormShow, setArtistFormShow] = useState(false);
  const [playlistEditable, setPlaylistEditable] = useState(false);
  const [playlistFormShow, setPlaylistFormShow] = useState(false);

  useEffect(() => {
    //read songs album artist
    srv.read("",(data)=>{
      let [al,ar,so] = [{},{},{}];

      for(let x of data){
        if(!so[x.id]){
          so[x.id] = x;
          so[x.id]['albums'] = {};
          so[x.id]['artists'] = {};
        }
        
        if(x.album_id!==null){
          if(al[x.album_id]){
            al[x.album_id].songs[x.id] = x;
          }else{
            al[x.album_id] = {name:x.album, id:x.album_id, time:x.time, songs:{[x.id]:x}}
          }
          ////
          so[x.id]['albums'][x.album_id] = ({album:x.album,time:x.time});
        }
        
        if(x.artist_id!==null)
        {
          if(ar[x.artist_id]){
            ar[x.artist_id].songs[x.id] = x;
          }else{
            ar[x.artist_id] = {name:x.artist, id:x.artist_id, songs:{[x.id]:x}}
          }
          //////
          so[x.id]['artists'][x.artist_id] = x.artist;
        }
      }

      so = Object.values(so).map(el=>({...el, albums : Object.values(el.albums), artists : Object.values(el.artists)}));
      setSongs(so.sort((a,b)=>a.name>b.name?1:-1));

      al = Object.values(al).map(el=>({...el,songs :Object.values(el.songs)}));
      setAlbums(al.sort((a,b)=>a.name>b.name?1:-1));

      ar = Object.values(ar).map(el=>({...el,songs :Object.values(el.songs)}));
      setArtists(ar.sort((a,b)=>a.name>b.name?1:-1));
    })
    ///read playlist
    srv.readPlaylists("",(data)=>{
      let pl = {}
      if(Array.isArray(data)) for(let x of data){
        if(!pl[x.playlist_id]){
          pl[x.playlist_id] = {id:x.playlist_id,name:x.name,songs:[],link_id:x.link_id,"is_favorite":x.is_favorite};
        }
        if(x.song_id!==null)
        {
          pl[x.playlist_id].songs.push({song_id:x.song_id,name:x.song_name,link_id:x.link_id,"is_favorite":x.is_favorite});
        }
      }
      setPlaylists(Object.values(pl));
      console.log(pl)
    })
  }, []);

  //event////////////////////////////////////////////////////////
  function on_new_album_click(evt){
    setAlbumFormShow(true);
  }
  function on_new_artist_click(evt){
    setArtistFormShow(true);
  }
  function on_new_playlist_click(evt){
    setPlaylistFormShow(true);
  }
  function on_album_add_button_click(evt){
    let selected_songs = get_all_selected_songs();
    selected_songs = songs.filter(el=>selected_songs.includes(el.id.toString()));
    get_all_selected_albums().forEach(el=>{
      let album_id = el.getAttribute("album_id");
      srv.addSongToAlbum(album_id,selected_songs.map(el=>el.id),(ret)=>{
        
        if(!ret.error){
          
          for(let x in albums) {
            if (albums[x].id.toString()===album_id) {
              albums[x].songs = albums[x].songs.concat(selected_songs);
            }
          }
          setAlbums([...albums]);
        }
      })
    })
  }
  function on_artist_add_button_click(evt){
    let selected_songs = get_all_selected_songs();
    selected_songs = songs.filter(el=>selected_songs.includes(el.id.toString()));

    get_all_selected_artists().forEach(el=>{
      let artist_id = el.getAttribute("artist_id");
      srv.addSongToArtist(artist_id,selected_songs.map(el=>el.id),(ret)=>{
        if(!ret.error){
          for(let x in artists) {
            if (artists[x].id.toString()===artist_id) {
              artists[x].songs = artists[x].songs.concat(selected_songs);
            }
          }
          setArtists([...artists]);
        }
      })
    })
  }
  //event////////////////////////////////////////////////////////
  return (
    <div className="container">
      <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre.min.css"/>
      <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-exp.min.css"/>
      <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-icons.min.css"/>
      <div className="columns">
        <div className="form-group column">
          <label className="form-switch">
            <input type="checkbox" checked={songs_col_show} onChange={()=>{set_songs_col_show(pv=>!pv)}}/>
            <i className="form-icon"></i> Show Songs
          </label>
        </div>
        <div className="form-group column">
          <label className="form-switch">
          <input type="checkbox" checked={albums_col_show} onChange={()=>{set_albums_col_show(pv=>!pv)}}/>
            <i className="form-icon"></i> Show Albums
          </label>
        </div>
        <div className="form-group column">
          <label className="form-switch">
          <input type="checkbox" checked={artists_col_show} onChange={()=>{set_artists_col_show(pv=>!pv)}}/>
            <i className="form-icon"></i> Show Artists
          </label>
        </div>
        <div className="form-group column">
          <label className="form-switch">
          <input type="checkbox" checked={playlists_col_show} onChange={()=>{set_playlists_col_show(pv=>!pv)}}/>
            <i className="form-icon"></i> Show Playlists
          </label>
        </div>
      </div>
      <div className="columns">
        <div className={`column col-lg-auto ${songs_col_show?"":"d-none"}`} id="songs_div">
          <Songs songs={songs}/>
        </div>
        {/* album */}
        <div className={`column ${albums_col_show?"":"d-none"}`}> 
          <div className="d-flex" >
            <div className="columns">
              <div className="column">
                <div className="form-group">
                  <label className="form-switch d-inline-block">
                    <input type="checkbox" onChange={()=>{setAlbumEditable(pv=>!pv)}}/>
                    <i className="form-icon"></i>Edit Album
                  </label>
                </div>
              </div>
              <div className="column ">
                <button className={`btn btn-success ${albumEditable?"":"disabled"} btn-sm`} onClick={on_new_album_click}>New Album</button>
              </div>            
            </div>
          </div>
          <div className="btn-group btn-group-block">
            <button className="btn btn-sm" onClick={on_album_add_button_click}>add selected songs to selected album</button>
          </div> 
          <div className="divider"></div>
          <Albums albums={albums} setalbums={setAlbums} albumEditable={albumEditable}/>
        </div>
        {/* artist */}
        <div className={`column ${artists_col_show?"":"d-none"}`}>
          <div className="d-flex" >
            <div className="columns">
              <div className="column">
                <div className="form-group">
                  <label className="form-switch d-inline-block">
                    <input type="checkbox" onChange={()=>{setArtistEditable(pv=>!pv)}}/>
                    <i className="form-icon"></i>Edit Artist
                  </label>
                </div>
              </div>
              <div className="column ">
                <button className={`btn btn-success ${artistEditable?"":"disabled"} btn-sm`} onClick={on_new_artist_click}>New Artist</button>
              </div>            
            </div>
          </div>
          <div className="btn-group btn-group-block">
            <button className="btn btn-sm" onClick={on_artist_add_button_click}>add selected songs to selected artist</button>
          </div> 
          <div className="divider"></div>
          <Artists artists={artists} setartists={setArtists} artistEditable={artistEditable}/>
        </div>
        {/* playlists */}
        <div className={`column ${playlists_col_show?"":"d-none"}`}>
          <div className="d-flex" >
            <div className="columns">
              <div className="column">
                <div className="form-group">
                  <label className="form-switch d-inline-block">
                    <input type="checkbox" onChange={()=>{setPlaylistEditable(pv=>!pv)}}/>
                    <i className="form-icon"></i>Edit Playlist
                  </label>
                </div>
              </div>
              <div className="column ">
                <button className={`btn btn-success ${playlistEditable?"":"disabled"} btn-sm`} onClick={on_new_playlist_click}>New Playlist</button>
              </div>            
            </div>
          </div>
          <Playlists playlists={playlists} setplaylists={setPlaylists} playlistEditable={playlistEditable} songs={songs} albums={albums} artists={artists}/>
        </div>
      </div>
      {albumFormShow?<AlbumNewForm setmodalshow={setAlbumFormShow} setalbums={setAlbums}/>:""}
      {artistFormShow?<ArtistNewForm setmodalshow={setArtistFormShow} setartists={setArtists}/>:""}
      {playlistFormShow?<PlaylistNewForm setmodalshow={setPlaylistFormShow} setplaylists={setPlaylists}/>:""}
    </div>
  );
}

export default Index;
