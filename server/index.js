const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const modelDB = require("./db");

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type,Authorization");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.use(express.static(path.join(__dirname, "./../build")));

app.set("/static", path.join(__dirname, "./../build/static"));

app.get("/", (req, res) => res.render("./../build/index"));

app.get("/api/getAllDefinitions", (req, res) => {
  const definitions = modelDB.getAllDefinitions();
  setTimeout(() => {
    //imitate real request to the DB
    res.status(200).send(definitions);
  }, 1000);
});
app.get("/api/getDefinitionToday", (req, res) => {
  const definitionsToday = modelDB.getDefinitionsByRecurrence();
  setTimeout(() => {
    res.status(200).send(definitionsToday);
  }, 1000);
});
app.post("/api/treat", async (req, res) => {
  const { treatList } = req.body;
  const status = await modelDB.updateDefinitions(treatList);
  res.status(200).send(status);
});
app.post("/api/reset", async (_, res) => {
  const status = await modelDB.resetDefinitions();
  res.status(200).send(status);
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./404.html"));
});
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
