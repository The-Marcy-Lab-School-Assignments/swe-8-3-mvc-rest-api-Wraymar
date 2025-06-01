import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllPlayers, createPlayer } from "../adapters/playerAdapters";

const Home = () => {
  // Get all fellows from the serverstate
  const [players, setPlayers] = useState([]);

  // form input state
  const [newName, setNewName] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [newClub, setNewClub] = useState("");

  // form submission response state
  const [newlyAddedPlayer, setNewlyAddedPlayer] = useState({});

  // Get me the most up to date full list of fellows
  useEffect(() => {
    const doFetch = async () => {
      const [allPlayers, error] = await getAllPlayers();
      //console.log("players from frontend: ", allPlayers);
      setPlayers(allPlayers);
    };
    //console.log("use Effect Ran");
    doFetch();
    /* 
       We add the newlyAddedPlayer as a dependency for the use effect so that...
       when a new player is created and the state changes then the page will be refreshed with
       the newly added player added to the list of players. 
    */
  }, [newlyAddedPlayer]);

  // Use the form data to create a POST request to create a new fellow
  const handleCreatePlayer = async (e) => {
    e.preventDefault();
    const [newPlayer, error] = await createPlayer(newName, newCountry, newClub);
    setNewlyAddedPlayer(newPlayer);

    setNewName("");
    setNewCountry("");
    setNewClub("");
  };

  return (
    <>
      <h1>Home</h1>
      <form onSubmit={handleCreatePlayer}>
        <label htmlFor="name">Add a new player:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          name="country"
          id="country"
          value={newCountry}
          onChange={(e) => setNewCountry(e.target.value)}
          placeholder="Country"
        />
        <input
          type="text"
          name="club"
          id="club"
          value={newClub}
          onChange={(e) => setNewClub(e.target.value)}
          placeholder="Club"
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {console.log("players from ul: ", players)}
        {players.map((player) => {
          return (
            <li key={player.id}>
              <Link to={`/players/${player.id}`}>
                {player.name} (Player {player.id})
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Home;
