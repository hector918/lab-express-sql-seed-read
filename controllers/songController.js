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

module.exports = songs;