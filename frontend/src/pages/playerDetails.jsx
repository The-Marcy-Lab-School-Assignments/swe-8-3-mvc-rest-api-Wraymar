import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getPlayerById,
  updatePlayer,
  deletePlayer,
} from "../adapters/playerAdapters";

const PlayerDetails = () => {
  const [player, setPlayer] = useState(null);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerCountry, setNewPlayerCountry] = useState("");
  const [newPlayerClub, setNewPlayerClub] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  //if (!player) return <p>Loading player data...</p>;

  // on load, get the fellow by id
  useEffect(() => {
    const doFetch = async () => {
      const [foundPlayer, error] = await getPlayerById(id);
      console.log(foundPlayer);
      setPlayer(foundPlayer);
    };
    doFetch();
  }, [id]);

  // when the delete button is pressed, send a DELETE request
  const handleDeletePlayer = async () => {
    await deletePlayer(id);
    navigate("/");
  };

  // when the form is filled out, send a PATCH request
  const handleUpdatePlayer = async (e) => {
    e.preventDefault();
    const [updatedPlayer, error] = await updatePlayer(
      id,
      newPlayerName,
      newPlayerCountry,
      newPlayerClub
    );

    setPlayer(updatedPlayer);

    /*
    After we submit and store the new player we want to reset the state so we can update
    another player 
    */
    setNewPlayerName("");
    setNewPlayerCountry("");
    setNewPlayerClub("");
  };

  console.log("player: ", player);

  return (
    <>
      <Link to="/">Go Home</Link>
      <h1>Player Details</h1>
      {player && (
        <>
          <p>Name: {player.name}</p>
          <p>Id: {player.id}</p>
        </>
      )}
      <form onSubmit={handleUpdatePlayer}>
        <label htmlFor="name">Update Player:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          placeholder="New Name"
        />
        <input
          type="text"
          name="country"
          id="country"
          value={newPlayerCountry}
          onChange={(e) => setNewPlayerCountry(e.target.value)}
          placeholder="New Country"
        />
        <input
          type="text"
          name="club"
          id="club"
          value={newPlayerClub}
          onChange={(e) => setNewPlayerClub(e.target.value)}
          placeholder="New Club"
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleDeletePlayer} className="danger">
        Delete player
      </button>
    </>
  );
};

export default PlayerDetails;
