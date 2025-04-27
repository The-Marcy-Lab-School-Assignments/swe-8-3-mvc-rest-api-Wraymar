//import the getId function
const getId = require(".../utils/getId");

//this is our mock database that will store the data of the soccer players
//at this moment we have three default ones that will always render
const players = [
  {
    name: "Cristiano Ronaldo",
    id: getId(),
    country: "Portugal",
    club: "Al Nassr",
  },
  {
    name: "Neymar Jr",
    id: getId(),
    country: "Brazil",
    club: "Santos Fc",
  },
  {
    name: "Lionel Messi",
    id: getId(),
    country: "Argentina",
    club: "Inter Miami",
  },
];

//now we create a class that will be used to create a new soccer player to add to the mock database

class Player {
  //the static method are used to interact with the mock database as a whole
  //the instance methods are used to interact with a single player

  //CREATE
  static create(name, country, club) {
    const newPlayer = {
      name,
      id: getId(),
      country,
      club,
    };
    //push the new player to the mock DB
    players.push(newPlayer);
    //return the new player
    return newPlayer;
  }

  //READ
  static getAllPlayers() {
    return [...players];
  }

  //READ
  static getPlayerById(id) {
    const player = players.find((player) => player.id === id);
    return player;
  }

  //UPDATE
  static editPlayer(id, newName, newCountry, newClub) {
    const player = players.find((player) => player.id === id);
    if (!player) {
      return null;
    }
    player.name = newName;
    player.country = newCountry;
    player.club = newClub;

    return player;
  }

  //DELETE
  static deletePlayer(id) {
    const playerIndex = players.findIndex((player) => player.id === id);
    if (playerIndex === -1) {
      return null;
    }
    //remove the player from mock DB from the playerIndex and remove just one element
    players.splice(playerIndex, 1);

    return "player successfully deleted";
  }
}

module.exports = Player;
