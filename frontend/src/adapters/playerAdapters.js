import handleFetch from "./handleFetch";

export const getAllPlayers = async () => {
  const [allPlayers, error] = await handleFetch("/api/players/");
  //console.log("players from adapter: ", allPlayers);
  return [allPlayers.data.players, error];
};

export const getPlayerById = async (id) => {
  const [player, error] = await handleFetch(`/api/players/${id}`);
  return [player.data.player, error];
};

export const createPlayer = async (name, country, club) => {
  const options = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ name, country, club }),
  };

  const [newPlayer, error] = await handleFetch(`/api/players/`, options);
  return [newPlayer, error];
};

export const deletePlayer = async (id) => {
  const options = {
    method: "DELETE",
  };
  const [success, error] = await handleFetch(`/api/players/${id}`, options);
  return [success, error];
};

export const updatePlayer = async (id, newName, newCountry, newClub) => {
  const options = {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ name: newName, country: newCountry, club: newClub }),
  };

  const [updatedPlayer, error] = await handleFetch(
    `/api/players/${id}`,
    options
  );
  return [updatedPlayer, error];
};
