
import { useParams } from "react-router-dom";
import SongDetails from "../Components/songDetails";

function Show() {
  const {id} = useParams();
  
  return (
    <div className="Show">
      <h2>Show</h2>
      <SongDetails id={id}/>
    </div>
  );
}

export default Show;
