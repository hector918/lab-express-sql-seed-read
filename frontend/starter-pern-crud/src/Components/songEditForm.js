import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import srv from "../fetch_";


function SongEditForm() {
  let { id } = useParams();
  let navigate = useNavigate();

  const [song, setSong] = useState({
    name: "",
    artist: "",
    album: "",
    time:"",
    is_favorite: false,
  });

  const updateSong = () => {
    srv.update(id,song,(data)=>{
      if(data.id) setSong(data);
      else console.log(data);
      
    })
    // axios
    //   .put(`${API}/bookmarks/${id}`, updatedBookmark)
    //   .then(
    //     () => {
    //       navigate(`/bookmarks/${id}`);
    //     },
    //     (error) => console.error(error)
    //   )
    //   .catch((c) => console.warn("catch", c));
  };

  const handleTextChange = (event) => {
    setSong({ ...song, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setSong({ ...song, is_favorite: !song.is_favorite });
  };

  useEffect(() => {
    srv.read(id,(data)=>{
      if(data.id) setSong(data);
      else navigate(`/not-found`);
    })
    // axios.get(`${API}/bookmarks/${id}`).then(
    //   (response) => setBookmark(response.data),
    //   (error) => navigate(`/not-found`)
    // );
  }, [id, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateSong(song, id);
  };
  return (
    <div className="Edit">
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
      <Link to={`/songs/${id}`}>
        <button>Nevermind!</button>
      </Link>
    </div>
  );
}

export default SongEditForm;