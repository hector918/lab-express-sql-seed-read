import { useState } from "react";
import GeneralForm from "./generalForm";
import srv from "../fetch_";
import { get_all_selected_artists } from "../gerenal_func";
function Artists({ artists, setartists, artistEditable }) {
  const [artistEditModalShow, setartistEditModalShow] = useState(false);
  const [gf, setGF] = useState(<></>);

  ///////////////////////////////////////////////
  function on_edit_click(evt) {
    //
    let artist_idx = evt.currentTarget.getAttribute("artist_idx");
    let artist_data = artists[artist_idx];
    let artistTemplete = {
      name: { type: "string", placeholder: "name plackholder", regex: "" },
    }
    setGF(<GeneralForm setupperform={on_save_artist} default_value={artist_data} formtemplete={artistTemplete} title="Edit artist" setmodalshow={setartistEditModalShow} />);
    setartistEditModalShow(true);
    ////////////////////////////////////////
    function on_save_artist(body) {
      delete body['songs'];

      srv.updateArtist(body.id, body, (data) => {
        data["songs"] = artists[artist_idx].songs;
        artists[artist_idx] = data;
        setartists([...artists]);
        setartistEditModalShow(false);
      })
    }
  }
  ///event///////////////////////////////////////////////////////
  function on_delete_click(evt) {
    let artist_idx = evt.currentTarget.getAttribute("artist_idx");
    let confirm = window.confirm("Click yes to confirm delete");
    if (confirm) {
      srv.deleteArtist(artists[artist_idx].id, (data) => {
        artists.splice(artist_idx, 1);
        setartists([...artists]);
      })
    }
  }
  function on_artist_div_click(evt) {

    get_all_selected_artists().forEach(el => {
      el.classList.remove("bg-primary");
    })
    evt.currentTarget.classList.add("bg-primary");
  }

  //////////////////////////////////////////////////////////////
  return (
    <>
      <div id="artists_div" className="d-block s-rounded">
        {artists.map((artist, idx) => {
          return <div key={artist.id} artist_id={artist.id} className="accordion" onClick={on_artist_div_click}>
            <input type="checkbox" id={`artist-${artist.id}`} className="accordion-checkbox" hidden style={{ display: "none" }} />
            <div className="accordion-header">
              <i className="icon icon-arrow-right mr-1" ></i>
              <label className="d-inline-block c-hand" htmlFor={`artist-${artist.id}`}>
                <span className="text-italic">{artist.name}</span>
              </label>
              <span>{artistEditable ? <><i className="icon icon-edit text-warning mx-2 c-hand" artist_idx={idx} onClick={on_edit_click}></i><i className="icon icon-cross text-error c-hand" artist_idx={idx} onClick={on_delete_click}></i></> : ""}</span>
            </div>
            <div className="accordion-body">
              <ol>
                {artist.songs.map((song, idx) => {
                  return <li key={idx}>{song.name}</li>
                })}
              </ol>
            </div>
          </div>
        })}
        {artistEditModalShow ? gf : ""}

      </div>
    </>
  );
}

export default Artists;
