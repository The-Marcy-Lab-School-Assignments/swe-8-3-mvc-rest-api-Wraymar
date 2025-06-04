import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PlayerDetails from "./pages/playerDetails";

function App() {
  //everything is console logged twice because strict mode is enabled in main
  //this only happens in development to help catch bugs, not in production
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/players/:id" element={<PlayerDetails />}></Route>
    </Routes>
  );
}

export default App;
