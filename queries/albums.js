const db = require("../db/dbConfig.js");


const updateAlbum = async (id, album) => {
  const { name, time } = album;
  try {
    const newSong = await db.one(
      `UPDATE albums SET name=$[name], time=$<time> WHERE id=$[id] RETURNING *`,
      { name, time, id }
    );
    return newSong;
  } catch (error) {
    throw error;
  }
};

const createAlbum = async (album) => {
  const { name, time } = album;
  try {
    const newAlbum = await db.one(
      `INSERT INTO albums (name, time) VALUES($[name] ,$[time]) RETURNING *`,
      { name, time }
    );
    return newAlbum;
  } catch (error) {
    throw error;
  }
};
const deleteAlbum = async (id) => {
  try {
    const album = await db.one(
      "DELETE FROM album_link_to_song WHERE album_id = $1;DELETE FROM albums WHERE id = $1 RETURNING *;",
      id
    );
    return album;
  } catch (error) {
    console.log(error)
    throw error;
  }
};
const addSongToAlbum = async (album_id,songs_id) => {
  try {
    songs_id = songs_id.filter(el => typeof el === "number");
    const newLink = await db.any(
      `INSERT INTO album_link_to_song (album_id, song_id) SELECT $[album_id], id as song_id FROM songs WHERE id in (${songs_id.join(",")}) RETURNING *`,
      { album_id }
    );
    return newLink;
  } catch (error) {
    throw error;
  }
}
module.exports = { updateAlbum,createAlbum,deleteAlbum,addSongToAlbum };