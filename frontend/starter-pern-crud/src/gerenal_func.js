function get_all_selected_albums() {
  return document.querySelector("#albums_div").querySelectorAll(".bg-primary");
}
function get_all_selected_artists() {
  return document.querySelector("#artists_div").querySelectorAll(".bg-primary");
}
function get_all_selected_songs() {
  let songs = [];
  document.querySelector("#songs_div").querySelectorAll('input[type="checkbox"]').forEach(el => el.checked ? songs.push(el.getAttribute("song_id")) : "");
  return songs;
}

export {
  get_all_selected_albums,
  get_all_selected_artists,
  get_all_selected_songs
}