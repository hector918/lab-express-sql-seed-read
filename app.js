const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')

const app = express();
app.use(cors());
app.use(express.json());
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
// // parse application/json
// app.use(bodyParser.json());
/////////////////////////////////////////////
// app.use(express.static('./react/budget-app-frontend/build'))
/////////////////////////////////////////////
app.get("/", (req, res) => {
  res.send("Hello song world!");
});
/////////////////////////////////////////////
app.use("/songs", require("./controllers/songController"));
/////////////////////////////////////////////
app.get("*", (req, res) => {
  res.status(404).send("no page found!");
});
////////////////////////////////////////////////
module.exports = app;