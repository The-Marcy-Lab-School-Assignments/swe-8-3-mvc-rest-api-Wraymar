//we import the player class to use in the controllers
const Player = require("../model/players");

//These are controllers that will handle requests for CRUD operation on our mock DB

//serve all players
const serveAllPlayers = (req, res) => {
  const players = Player.getAllPlayers();
  res.status(200).send({ status: "success", data: { players } });
};

//serve a single player
const servePlayer = (req, res) => {
  //get the id from the request params and use it to find the player in the mock DB
  const { id } = req.params;
  //use the getPlayerById method to find the player in the mock DB
  const player = Player.getPlayerById(Number(id));

  //if no player with the id is found then we return a 404 error
  if (!player) {
    return res.status(404).send({
      status: "fail",
      message: `No player found with the id of ${id}`,
    });
  }
  //if the player is found then we return the player
  res.status(200).send({
    status: "success",
    data: { player },
  });
};

const createPlayer = (req, res) => {
  //after the user creates a player and send the request to the server
  //here we destructure the name, country and club from the request body so the server can use them
  const { name, country, club } = req.body;

  //if the user leaves any fields empty then we return an 400 error which means bad request
  if (!name || !country || !club) {
    return res.status(400).send({
      status: "fail",
      message: "Please provide name, country and club",
    });
  }
  //if all fields are provided then we create a new player using the create method from the player class
  const newPlayer = Player.create(name, country, club);
  //status code 201 means data was created successfully
  res.status(201).send(newPlayer);
};

const updatePlayer = (req, res) => {
  const { name, country, club } = req.body;

  //if the user leaves any fields empty then we return an 400 error which means bad request
  if (!name || !country || !club) {
    return res.status(400).send({
      status: "fail",
      message: "Please provide name, country and club",
    });
  }
  //here we destructure the id from the request params of the request with the player id
  //this is the id that we will use to find the player in the mock DB
  const { id } = req.params;

  //now we use the editPlayer method from the player class to find and update the player
  //the editPlayer method already checks if the player exists or not
  const updatedPlayer = Player.editPlayer(Number(id), name, country, club);

  //if the player is not found then we return a 404 error
  if (!updatedPlayer) {
    return res.status(404).send({
      status: "fail",
      message: `No player found with the id of ${id}`,
    });
  }
  res.status(200).send({
    status: "successfully updated",
    data: { updatedPlayer },
  });
};

const deletePlayer = (req, res) => {
  //we get the id from the request params
  //this is the id that we will use to find and delete the player from the mock DB
  const { id } = req.params;
  const deleted = Player.delete(Number(id));

  if (!deleted) {
    return res.status(404).send({
      message: `No fellow with the id ${id}`,
    });
  }
  //we send a 204 status which means it was successful but no content to send back
  res.status(204).send({
    status: "successfully deleted",
  });
};

module.exports = {
  serveAllPlayers,
  servePlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
