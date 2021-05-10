// index.js is entry point for the server,

// importing NPM modules ,dependencies and helper functions
const express = require("express");
const path = require("path");
const cors = require("cors");
const { default: axios } = require("axios");
const { request } = require("express");
// initialize the server
const app = express();

// Enable CORS
app.use(cors());

//replacement fot bodyparser() to parse jSON BOdies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// home page route useful for initial server testing
app.get("/", (req, res) => {
  res.send("Hello you have just hit the homepage");
});

// since there is only one endpoint to be used
//  routes definition in the index.js makes more sense
app.get("/search", (req, res) => {
  const extractQueryString = req.query.query;

  // specifying the two urls used

  let firstURL = `http://api.hel.fi/linkedevents/v1/search/?format=json&q=${extractQueryString}`;
  let secondURL = `https://api.finna.fi/api/v1/search?type=Title&field[]=title&field[]=images&field[]=urls&field[]=subjects&field[]=formats&lookfor=${extractQueryString}`;

  const requestForFirstURL = axios.get(firstURL);
  const requestForSecondURL = axios.get(secondURL);
  axios
    .all([requestForFirstURL, requestForSecondURL])
    .then((response) => axios.all(response.map((res) => res.data)))
    .then((finalResponse) => {
      let responseFromFirstURL = finalResponse[0].data;

      let responseFromSecondURL = finalResponse[1].records;

      // using spread operator to combine the results of both url calls
      const combinedFinalResponse = [
        ...responseFromFirstURL,
        ...responseFromSecondURL,
      ];

      res.status(200).send(combinedFinalResponse);
    })
    .catch((err) => {
      res.status(404).json({ Error: "DATA NOT Found " });
    });
});

// Serve static assests if in production eg, deploying to heroku
if (process.env.Node_ENV === "production")
  //set static folder
  app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// Define a port to run a server on or a deploy env port
const PORT = process.env.PORT || 5000;

// tell the server what port to listen on
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
