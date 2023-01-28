import { useState } from "react";
import { useNavigate } from "react-router-dom";
import srv from "../fetch_";

function SongNewForm() {
  let navigate = useNavigate();

  const addBookmark = () => {
    srv.create(song,(data)=>{
      console.log(data);
    })
    // axios
    //   .post(`${API}/bookmarks`, newBookmark)
    //   .then(
    //     () => {
    //       navigate(`/bookmarks`);
    //     },
    //     (error) => console.error(error)
    //   )
    //   .catch((c) => console.warn("catch", c));
  };

  const [song, setSong] = useState({
    name: "",
    artist: "",
    album: "",
    time:"",
    is_favorite: false,
  });

  const handleTextChange = (event) => {
    setSong({ ...song, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setSong({ ...song, is_favorite: !song.is_favorite });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addBookmark(song);
  };
  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={song.name}
          type="text"
          onChange={handleTextChange}
          placeholder="Name of Song"
          required
        />
        <label htmlFor="artist">Artist:</label>
        <input
          id="artist"
          type="text"
          name="artist"
          value={song.artist}
          placeholder="educational, inspirational, ..."
          onChange={handleTextChange}
        />
        <label htmlFor="artist">Album:</label>
        <input
          id="album"
          type="text"
          name="album"
          value={song.album}
          placeholder="educational, inspirational, ..."
          onChange={handleTextChange}
        />

        <label htmlFor="time">Time:</label>
        <input
          id="time"
          type="number"
          pattern="d{4}"
          required
          value={song.time}
          name="time"
          placeholder="2023"
          onChange={handleTextChange}
        />
        
        <label htmlFor="is_favorite">Favorite:</label>
        <input
          id="is_favorite"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={song.is_favorite}
        />

        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default SongNewForm;
