//utils -> getId(), fetch data
//model -> classes (one to many) 4 CRUD methods of them
//index.js -> 8 controllers

//require the express module
const express = require("express");
//use the path module to get the path to the frontend dist folder
const path = require("path");

//import all the controllers
const {
  serveAllPlayers,
  servePlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
} = require("./controllers/playerControllers");

const app = express();
const pathToFrontendDist = path.join(__dirname, "../frontend/dist");

//middleware
const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  req.time = time;
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

//this middleware will serve the static files
const serveStatic = express.static(pathToFrontendDist);

// A new middleware has appeared!
// This parses incoming requests with JSON data in the body
// Access the data using `req.body`
const parseJSON = express.json();

app.use(logRoutes); // Print out every incoming request
app.use(serveStatic); // Serve static public/ content
app.use(parseJSON); // Parses request body JSON

////////////////////////
// Endpoints
////////////////////////

//in the path we use :id to get the id of the player
//this is a dynamic route that will get the id of the player from the request params

//get requests to read data from the mock DB
app.get("/api/players", serveAllPlayers);
app.get("/api/players/:id", servePlayer);

//post request to create a new player and add it to the mock DB
app.post("/api/players", createPlayer);

//patch request to update a player in the mock DB
app.patch("/api/players/:id", updatePlayer);

//delete request to delete a player in the mock DB
app.delete("/api/players/:id", deletePlayer);

//get all requests
app.get("*", (req, res, next) => {
  //if the request is for the api then we pass it to the next middleware
  if (req.originalUrl.startsWith("/api")) return next();
  //if the request is not for the api then we send the index.html file from the frontend dist folder
  //this will serve the index.html file for all other requests
  res.sendFile(pathToFrontendDist);
});

//define the port to listen on
const port = 8080;

//start the server and listen on this port
app.listen(port, () => console.log(`listening at http://localhost:${port}`));
