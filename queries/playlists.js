const db = require("../db/dbConfig.js");

const readPlaylists = async (ids,username=undefined) => {
  if (!username) throw "no user name";
  try {
    const playlists = await db.any(`SELECT playlists.id as playlist_id,playlists.name,playlists.username,pllts.song_id,songs.name as song_name,pllts.song_order,pllts.id as link_id,pllts.is_favorite FROM playlists 
    LEFT JOIN playlist_link_to_song as pllts on playlists.id = pllts.playlist_id
    LEFT JOIN songs on songs.id = pllts.song_id 
    WHERE playlists.username = $[username]
    ORDER BY pllts.song_order ASC`,{username});
    return playlists;
  } catch (error) {
    throw error;
    
  }
}

const setStarPlaylist = async (id,status) => {
  
  try {
    const newLink = await db.one(`UPDATE playlist_link_to_song SET is_favorite = $[status] WHERE id=$[id] RETURNING *`,
      { id, status }
    );
    return newLink;
  } catch (error) {
    throw error;
  }
};

const updatePlaylist = async (id, playlist) => {
  const { name, time } = playlist;
  try {
    const newSong = await db.one(
      `UPDATE playlists SET name=$[name], time=$<time> WHERE id=$[id] RETURNING *`,
      { name, time, id }
    );
    return newSong;
  } catch (error) {
    throw error;
  }
};

const createPlaylist = async (playlist, username) => {
  const { name } = playlist;
  try {
    const newPlaylist = await db.one(
      `INSERT INTO playlists (name, username) VALUES($[name], $[username] ) RETURNING *`,
      { name, username }
    );
    return newPlaylist;
  } catch (error) {
    throw error;
  }
};
const deletePlaylist = async (id) => {
  try {
    const playlist = await db.one(
      "DELETE FROM playlist_link_to_song WHERE playlist_id = $1;DELETE FROM playlists WHERE id = $1 RETURNING *;",
      id
    );
    return playlist;
  } catch (error) {
    console.log(error)
    throw error;
  }
};
const addSongToPlaylist = async (songs) => {
  try {
    return await db.tx(async t => {
      const queries = await songs.map(l => {
        return t.one(`
        WITH inserted AS (
          INSERT INTO playlist_link_to_song(playlist_id, song_id) VALUES($[playlist_id], $[song_id]) RETURNING *
        )
        SELECT inserted.*, songs.name FROM inserted
        LEFT JOIN songs ON inserted.song_id = songs.id`, l );
      });
      return t.batch(queries);
    })
  } catch (error) {
    throw error;
  }
}
module.exports = { readPlaylists, updatePlaylist, createPlaylist, deletePlaylist, addSongToPlaylist, setStarPlaylist };
///////////////////////////////////////////////////////////////////////////

      // .then(data => {
      //   console.log(data);
      //   return data
      // })
      // .catch(error => {
      //   console.log(error)
      //   throw error;
      // });
      /*
      WITH inserted AS (
          INSERT INTO review VALUES (...) RETURNING *
      )
      SELECT inserted.*, fit.*
      FROM inserted
      INNER JOIN fit ON inserted.fit_id = fit.id
      */
    // const newLink = await db.any(
    //   `INSERT INTO playlist_link_to_song (playlist_id, song_id) SELECT $[playlist_id], id as song_id FROM songs WHERE id in (${songs_id.join(",")}) RETURNING *`,
    //   { playlist_id }
    // );
    // return newLink;