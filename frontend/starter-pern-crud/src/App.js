// DEPENDENCIES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
// PAGES
import Edit from "./Pages/Edit";
import FourOFour from "./Pages/FourOFour";
import Home from "./Pages/Home";
import Index from "./Pages/Index";
import New from "./Pages/New";
import Show from "./Pages/Show";
import Login from "./Pages/login";
// COMPONENTS
import NavBar from "./Components/NavBar";

function App() {

  const [ token, setToken ] = useState(undefined);
  
  if(!token) {
    return <Login settoken={setToken} />
  }
  
  return (
    <div className="App">
      <Router>
        <NavBar username={token}/>
        <main>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/songs" element={<Index />} />
            <Route path="/songs/new" element={<New />} />
            <Route exact path="/songs/:id" element={<Show />} />
            <Route path="/songs/:id/edit" element={<Edit />} />
            <Route path="*" element={<FourOFour />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
