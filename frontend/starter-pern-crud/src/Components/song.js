import { Link } from "react-router-dom";

function Song({ song }) {
  return (
    <div className="tile tile-centered">
      <div className="tile-icon">
        <div className="example-tile-icon">
          <i className="icon icon-file centered"></i>
        </div>
      </div>
      <div className="tile-content">
        <div className="tile-title">{song.name}</div>
        <small className="tile-subtitle text-gray">{song.artist} · {song.album} · {song.time}</small>
      </div>
      <div className="tile-action">
        <button className="btn btn-link">
          <i className="icon icon-more-vert"></i>
        </button>
      </div>
    </div>
  );
}
export default Song;
