-- DROP DATABASE IF EXISTS tuner_dev;
-- CREATE DATABASE tuner_dev;
SELECT 'CREATE DATABASE tuner_dev' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'tuner_dev')\gexec;
\c tuner_dev;


DROP TABLE IF EXISTS songs, artists, artist_link_to_song, albums, album_link_to_song, playlists, playlist_link_to_song;

CREATE TABLE songs (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL
);

CREATE TABLE artists (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL
);
CREATE TABLE artist_link_to_song (
 id SERIAL PRIMARY KEY,
 artist_id INT,
 song_id INT
);

CREATE TABLE albums (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 time TEXT
);
CREATE TABLE album_link_to_song (
 id SERIAL PRIMARY KEY,
 album_id INT,
 song_id INT
);

CREATE TABLE playlists (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 username TEXT
);

CREATE TABLE playlist_link_to_song (
 id SERIAL PRIMARY KEY,
 playlist_id INT,
 song_id INT,
 is_favorite BOOLEAN
);

