const express = require("express");
const songs = express.Router();
const { getAllSongs, getSong, createSong, deleteSong, updateSong, createSongCombine } = require("../queries/songs");
const { checkSongForm } = require("../validations/songs-validations");
// INDEX
songs.get("/", async (req, res) => {
  try {
    const filter = req.query;

    filter.order = filter.order?.toLowerCase()==="desc"? "DESC":"ASC";
    if(filter['is_favorite']) filter.is_favorite = filter.is_favorite==="true"?true:false;
    const allSongs = await getAllSongs(filter);  
    res.json(allSongs);
  } catch (error) {
    ////
    console.log(error);
    res.status(500).send({erorr:"error"});
  }
});

// show
songs.get("/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const oneSong = await getSong(id);
    if(oneSong){
      res.json(oneSong);
    }else{
      throw "song id not found";
    } 
    
  } catch (error) {
    ////
    console.log(error);
    res.status(500).send({erorr:error});
  }
});

// CREATE
songs.post("/", checkSongForm, async (req, res) => {
  try {
    const song = await createSongCombine(req.body);
    res.json({'sucess':"true"});
  } catch (error) {
    console.log(error)
    res.status(404).json({ error });
  }
});

// DELETE
songs.delete("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const song = await deleteSong(id);
    if(!song) throw "id not found"
    else res.json(song);
  } catch (error) {
    res.status(404).json({ error });
  }
});

// UPDATE
songs.put("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const newSong = req.body;
    const song = await updateSong(id, newSong);
    if(!song) throw "id not found";
    else res.json(song);
  } catch (error) {
    console.log(error)
    res.status(404).json({ error });
  }
});
////////////////////////////////////////////////////////////////////
const { createAlbum,updateAlbum,deleteAlbum,addSongToAlbum } = require("../queries/albums");
songs.put("/albums/:id", async (req, res)=>{
  try {
    const {id} = req.params;
    let album = req.body;
    album = await updateAlbum(id, album);
    if(!album) throw "id not found";
    else res.json(album);
  } catch (error) {
    console.log(error)
    res.status(404).json({ error });
  }
});
// CREATE
songs.post("/albums",  async (req, res) => {
  try {
    const album = await createAlbum(req.body);
    res.json(album);
  } catch (error) {
    console.log(error)
    res.status(404).json({ error });
  }
});
// DELETE
songs.delete("/albums/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const album = await deleteAlbum(id);
    if(!album) throw "id not found"
    else res.json(album);
  } catch (error) {
    res.status(404).json({ error });
  }
});
// CREATE
songs.post(`/albums/add_songs/:id`,  async (req, res) => {
  try {
    const {id} = req.params;
    const album = await addSongToAlbum(id,req.body);
    res.json(album);
  } catch (error) {
    console.log(error)
    res.status(404).json({ error });
  }
});
////////////////////////////////////////////////////////////////////
const { createArtist,updateArtist,deleteArtist,addSongToArtist } = require("../queries/artists");
songs.put("/artists/:id", async (req, res)=>{
  try {
    const {id} = req.params;
    let artist = req.body;
    artist = await updateArtist(id, artist);
    if(!artist) throw "id not found";
    else res.json(artist);
  } catch (error) {
    console.log(error)
    res.status(404).json({ error });
  }
});
// CREATE
songs.post("/artists",  async (req, res) => {
  try {
    const artist = await createArtist(req.body);
    res.json(artist);
  } catch (error) {
    console.log(error)
    res.status(404).json({ error });
  }
});
// DELETE
songs.delete("/artists/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const artist = await deleteArtist(id);
    if(!artist) throw "id not found"
    else res.json(artist);
  } catch (error) {
    res.status(404).json({ error });
  }
});
// CREATE
songs.post(`/artists/add_songs/:id`,  async (req, res) => {
  try {
    const {id} = req.params;
    const artist = await addSongToArtist(id,req.body);
    res.json(artist);
  } catch (error) {
    console.log(error)
    res.status(404).json({ error });
  }
});
module.exports = songs;