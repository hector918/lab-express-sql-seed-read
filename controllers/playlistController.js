const express = require("express");
const playlists = express.Router();


const { createPlaylist,setStarPlaylist,deletePlaylist,addSongToPlaylist, readPlaylists } = require("../queries/playlists");

//read
playlists.get("/", async (req, res)=>{
  try {
    const username = req.session.username;
    if(!username) throw "username is undefined";
    let playlists = await readPlaylists();
    if(!playlists) throw "server error";
    else res.json(playlists);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error });
  }
});
//update
// playlists.put("/:id", async (req, res)=>{
//   try {
//     const {id} = req.params;
//     const username = req.session.username;
//     let playlist = req.body;
//     playlist = await updatePlaylist(id, username, playlist);
//     if(!playlist) throw "id not found";
//     else res.json(playlist);
//   } catch (error) {
//     console.log(error)
//     res.status(404).json({ error });
//   }
// });
//update
playlists.put("/star/:id", async (req, res)=>{
  try {
    const {id} = req.params;
    let {is_favorite} = req.body;
    playlist = await setStarPlaylist(id, is_favorite);
    if(!playlist) throw "id not found";
    else res.json(playlist);
  } catch (error) {
    console.log(error)
    res.status(404).json({ error });
  }
});
// CREATE
playlists.post("/",  async (req, res) => {
  try {
    const username = req.session.username;
    const playlist = await createPlaylist(req.body, username);
    res.json(playlist);
  } catch (error) {
    console.log(error)
    res.status(404).json({ error });
  }
});
// DELETE
playlists.delete("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const playlist = await deletePlaylist(id);
    if(!playlist) throw "id not found"
    else res.json(playlist);
  } catch (error) {
    res.status(404).json({ error });
  }
});
// CREATE
playlists.post(`/add_songs/`,  async (req, res) => {
  try {
    const songs = await addSongToPlaylist(req.body,req.session.username);
    res.json(songs);
  } catch (error) {
    console.log(error)
    res.status(404).json({ error });
  }

});
module.exports = playlists;