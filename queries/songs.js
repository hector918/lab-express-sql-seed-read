const db = require("../db/dbConfig.js");

const getAllSongs = async () => {
  try {
    const allSongs = await db.any(`SELECT songs.id,songs.name,artists.name as artist,albums.name as album,albums.time,albums.id as album_id,artists.id as artist_id FROM songs 
    INNER JOIN artist_link_to_song ON artist_link_to_song.song_id = songs.id 
    INNER JOIN artists ON artist_link_to_song.artist_id = artists.id
    INNER JOIN album_link_to_song ON album_link_to_song.song_id = songs.id
    INNER JOIN albums ON album_link_to_song.album_id = albums.id`,);
    return allSongs;
  } catch (error) {
    throw error;
  }
};

const getSong = async (id) => {
  try {
    const oneSong = await db.oneOrNone(`SELECT songs.id,songs.name,artists.name as artist,albums.name as album,albums.time,albums.id as album_id,artists.id as artist_id FROM songs 
    INNER JOIN artist_link_to_song ON artist_link_to_song.song_id = songs.id 
    INNER JOIN artists ON artist_link_to_song.artist_id = artists.id
    INNER JOIN album_link_to_song ON album_link_to_song.song_id = songs.id
    INNER JOIN albums ON album_link_to_song.album_id = albums.id
    WHERE songs.id = $[id]`,{id});
    return oneSong;
  } catch (error) {
    throw error;
  }
};

// const combine_create
// DO $$
// DECLARE songid int;
// DECLARE artistid int;
// DECLARE albumid int;
// BEGIN
//   INSERT INTO songs (name) VALUES ('All Because of You') RETURNING id INTO songid;
//   INSERT INTO artists (name) VALUES ('U2') RETURNING id INTO artistid;
//   INSERT INTO albums (name) VALUES ('How to Dismantle an Atomic Bomb') RETURNING id INTO albumid;
//   INSERT INTO artist_link_to_song ( song_id,artist_id ) VALUES (songid,artistid);
//   INSERT INTO album_link_to_song ( song_id,album_id ) VALUES (songid,albumid);
// END $$;
const createSongCombine = async (song)=>{
  const { name, artist, album, time, is_favorite } = song;
  try {
    const newSong = await db.none(
      `DO $$
      DECLARE songid int;
      DECLARE artistid int;
      DECLARE albumid int;
      BEGIN
        INSERT INTO songs (name, is_favorite) VALUES ($[name],$[is_favorite]) RETURNING id INTO songid;
        INSERT INTO artists (name) VALUES ($[artist]) RETURNING id INTO artistid;
        INSERT INTO albums (name, time) VALUES ($[album],$[time]) RETURNING id INTO albumid;
        INSERT INTO artist_link_to_song ( song_id,artist_id ) VALUES (songid,artistid);
        INSERT INTO album_link_to_song ( song_id,album_id ) VALUES (songid,albumid);
      END $$`,
      {name, artist, album, time, is_favorite}
    );

    return newSong;
  } catch (error) {
    console.log(error)
    throw error;
  }
}



const createSong = async (song) => {
  const { name, artist, album, time, is_favorite } = song;
  try {
    const newSong = await db.one(
      "INSERT INTO songs (name, artist, album, time, is_favorite) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [name, artist, album, time, is_favorite]
    );
    return newSong;
  } catch (error) {
    throw error;
  }
};

const deleteSong = async (id) => {
  try {
    const song = await db.one(
      "DELETE FROM songs WHERE id = $1 RETURNING *",
      id
    );
    return song;
  } catch (error) {
    throw error;
  }
};

const updateSong = async (id, song) => {
  const { name, artist, album, time, is_favorite } = song;
  try {
    const newSong = await db.one(
      `UPDATE songs SET name=$[name], artist=$[artist], album=$[album], time=$<time>, is_favorite=$[is_favorite] WHERE id=$[id] RETURNING *`,
      {name, artist, album, time, is_favorite, id}
    );
    return newSong;
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllSongs, getSong, createSong, deleteSong, updateSong,
  createSongCombine,
};