const db = require("../db/dbConfig.js");

const updateArtist = async (id, artist) => {
  const { name } = artist;
  try {
    const newArtist = await db.one(
      `UPDATE artists SET name=$[name] WHERE id=$[id] RETURNING *`,
      { name, id }
    );
    return newArtist;
  } catch (error) {
    throw error;
  }
};

const createArtist = async (artist) => {
  const { name } = artist;
  try {
    const newArtist = await db.one(
      `INSERT INTO artists (name) VALUES($[name]) RETURNING *`,
      { name }
    );
    return newArtist;
  } catch (error) {
    throw error;
  }
};
const deleteArtist = async (id) => {
  try {
    const artist = await db.one(
      "DELETE FROM artist_link_to_song WHERE artist_id = $1;DELETE FROM artists WHERE id = $1 RETURNING *;",
      id
    );
    return artist;
  } catch (error) {
    console.log(error)
    throw error;
  }
};
const addSongToArtist = async (artist_id,songs_id) => {
  try {
    songs_id = songs_id.filter(el => typeof el === "number");
    const newLink = await db.any(
      `INSERT INTO artist_link_to_song (artist_id, song_id) SELECT $[artist_id], id as song_id FROM songs WHERE id in (${songs_id.join(",")}) RETURNING *`,
      { artist_id }
    );
    return newLink;
  } catch (error) {
    throw error;
  }
}
module.exports = { updateArtist,createArtist,deleteArtist,addSongToArtist };