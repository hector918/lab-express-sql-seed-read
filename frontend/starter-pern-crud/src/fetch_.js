const API = process.env.REACT_APP_API_URL;
const useinfo = {};
let add_message = null;
let setMsgEntry = (func)=>{
  add_message = func;
}
let default_fetch_options = {credentials: "include",};
function error_handle (error){
 
  if(add_message)
  { 
    add_message("read error",error.toString());
  }

}

//////////////////////////////////////////////////
function getUsername(){
  return useinfo['name'];
}
function login(body,cb){//post
  let options = {
    ...default_fetch_options,
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(`${API}/login`,options)
    .then(response=>response.json())
    .then(data=>{
      if(data['success']) useinfo.name = data.name;
      cb(data);
    })
    .catch(error_handle);
}
function logout(name,cb){//get
  
  fetch(`${API}/logout`,default_fetch_options)
    .then(response=>response.json())
    .then(data=>{
      delete useinfo.name;
      cb(data);
    })
    .catch(error_handle);
}
//////////////////////////////////////////////////
function read(text,cb)//get
{
  fetch(`${API}/${text}`,default_fetch_options)
    .then(response=>response.json())
    .then(data=>{cb(data)})
    .catch(error_handle);
}

function update(id,body,cb)//put
{
  let options = {
    ...default_fetch_options,
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(`${API}/${id}`,options)
    .then(response=>response.json())
    .then(data=>{cb(data)})
    .catch(error_handle);
}
function del(id,cb)//delete
{
  let options = {
    ...default_fetch_options,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(`${API}/${id}`,options)
    .then(response=>response.json())
    .then(data=>{cb(data)})
    .catch(error_handle);
}
function create(body,cb)//post
{
  let options = {
    ...default_fetch_options,
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(`${API}`,options)
    .then(response=>response.json())
    .then(data=>{cb(data)})
    .catch(error_handle);
}
///////////////////////////////////////////////////////////////////
function updateAlbum(id,body,cb)//put
{
  let options = {
    ...default_fetch_options,
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(`${API}/albums/${id}`,options)
    .then(response=>response.json())
    .then(data=>{cb(data)})
    .catch(error_handle);
}
function createAlbum(body,cb)//post
{
  let options = {
    ...default_fetch_options,
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(`${API}/albums`,options)
    .then(response=>response.json())
    .then(data=>{cb(data)})
    .catch(error_handle);
}
function deleteAlbum(id,cb)//delete
{
  let options = {
    ...default_fetch_options,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(`${API}/albums/${id}`,options)
    .then(response=>response.json())
    .then(data=>{cb(data)})
    .catch(error_handle);
}
function addSongToAlbum(album_id,songs_id,cb)//POST
{
  let options = {
    ...default_fetch_options,
    method: 'POST',
    body: JSON.stringify(songs_id),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(`${API}/albums/add_songs/${album_id}`,options)
    .then(response=>response.json())
    .then(data=>{cb(data)})
    .catch(error_handle);
}
/////////////////////////////////////////////////////////////////////
function updateArtist(id,body,cb)//put
{
  let options = {
    ...default_fetch_options,
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(`${API}/artists/${id}`,options)
    .then(response=>response.json())
    .then(data=>{cb(data)})
    .catch(error_handle);
}
function createArtist(body,cb)//post
{
  let options = {
    ...default_fetch_options,
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(`${API}/artists`,options)
    .then(response=>response.json())
    .then(data=>{cb(data)})
    .catch(error_handle);
}
function deleteArtist(id,cb)//delete
{
  let options = {
    ...default_fetch_options,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(`${API}/artists/${id}`,options)
    .then(response=>response.json())
    .then(data=>{cb(data)})
    .catch(error_handle);
}
function addSongToArtist(album_id,songs_id,cb)//POST
{
  let options = {
    ...default_fetch_options,
    method: 'POST',
    body: JSON.stringify(songs_id),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(`${API}/artists/add_songs/${album_id}`,options)
    .then(response=>response.json())
    .then(data=>{cb(data)})
    .catch(error_handle);
}
/////////////////////////////////////////////////////////////////////
function readPlaylists(text,cb)//get
{
  fetch(`${API}/playlists/${text||""}`,default_fetch_options)
    .then(response=>response.json())
    .then(data=>{cb(data)})
    .catch(error_handle);
}
function setStarPlaylist(id,body,cb)//put
{
  let options = {
    ...default_fetch_options,
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(`${API}/playlists/star/${id}`,options)
    .then(response=>response.json())
    .then(data=>{cb(data)})
    .catch(error_handle);
}
function createPlaylist(body,cb)//post
{
  let options = {
    ...default_fetch_options,
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(`${API}/playlists`,options)
    .then(response=>response.json())
    .then(data=>{cb(data)})
    .catch(error_handle);
}
function deletePlaylist(id,cb)//delete
{
  let options = {
    ...default_fetch_options,
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  }
  fetch(`${API}/playlists/${id}`,options)
    .then(response=>response.json())
    .then(data=>{cb(data)})
    .catch(error_handle);
}
function addSongToPlaylist(songs,cb)//POST
{
  let options = {
    ...default_fetch_options,
    method: 'POST',
    body: JSON.stringify(songs),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(`${API}/playlists/add_songs/`,options)
    .then(response=>response.json())
    .then(data=>{cb(data)})
    .catch(error_handle);
}
/////////////////////////////////////////////////////////////////////
export default{
  getUsername,
  login,
  logout,
  read,
  update,
  del,
  create,
  updateAlbum,
  createAlbum,
  deleteAlbum,
  addSongToAlbum,
  updateArtist,
  createArtist,
  deleteArtist,
  addSongToArtist,
  readPlaylists,
  createPlaylist,
  addSongToPlaylist,
  deletePlaylist,
  setStarPlaylist
}