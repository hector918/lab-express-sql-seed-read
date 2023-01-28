function Songs({songs}) {
  return (
    <>
      {songs.map((song) => {
        return <div key={song.id} className="tile tile-centered ">
          <div className="tile-icon">
            <div className="example-tile-icon">
              <i className="icon icon-file centered"></i>
            </div>
          </div>
          <div className="tile-content">
            <div className="tile-title">{song.name}</div>
            <div><small className=" text-gray">{song.artists.join(" · ")}</small></div>
            <div>
            <small className=" text-gray">{song.albums.map(el=>` · ${el.album} - (${el.time}) `)}</small></div>
          </div>
          <div className="tile-action">
            <div className="form-group">
              <label className="form-checkbox form-inline">
                <input type="checkbox" song_id={song.id}/><i className="form-icon"></i>
              </label>
            </div>
            {/* <button className="btn btn-link">
              <i className="icon icon-more-vert" title={song.name}></i>
            </button> */}
          </div>
        </div>
      })}
    </>
  );
}


export default Songs;
