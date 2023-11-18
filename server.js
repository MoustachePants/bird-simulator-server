const express = require("express");
const app = express();
const cors = require("cors");
const startInterval = require("./flightControlSystem/interval");
const birds = require("./flightControlSystem/birdsData");
const commandCenter = require("./flightControlSystem/commandCenter");
const mapEntities = require("./MapEntities/entities");

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

startInterval();

let counter = 0;

app.get("/", (req, res) => {
  console.log("Response to the client #" + counter);
  counter++;
  res.status(200).json(birds);
});

app.post("/", (req, res) => {
  const commandBody = req.body;
  commandCenter(commandBody);
  res.status(201).json("");
});

app.get("/entities", (req, res) => {
  // console.log("Deliver Entities");
  // console.log(mapEntities);
  res.status(200).json(mapEntities);
});
