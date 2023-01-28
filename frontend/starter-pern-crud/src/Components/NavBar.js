import { Link } from "react-router-dom";

export default function NavBar({username}) {

  console.log(username)
  
  return (
    <nav>
      <h1>
        <Link to="/songs">Music - {username.toString()}</Link>
      </h1>
      <div className="button">
        <Link to="/songs/new">New Song</Link>
      </div>
    </nav>
  );
}
