const birds = require("../birdsData");
const birdFinder = require("../../utils/birdFinder");

const flyTo = (birdIndex, requiredPosition) => {
  birds[birdIndex].required.position = requiredPosition;
};

const changeSpeed = (birdIndex, requiredSpeed) => {
  birds[birdIndex].required.speed = requiredSpeed;
};

const changeAltitude = (birdIndex, requiredAltitude) => {
  birds[birdIndex].required.altitude = requiredAltitude;
};

const commandCenter = (commandBody) => {
  let { tailNum, requiredPosition, requiredSpeed, requiredAltitude } =
    commandBody;

  // console.log({ tailNum, requiredPosition, requiredSpeed, requiredAltitude });

  const { bird, birdIndex } = birdFinder(tailNum);

  if (requiredPosition) flyTo(birdIndex, requiredPosition);
  if (requiredSpeed) changeSpeed(birdIndex, requiredSpeed);
  if (requiredAltitude) changeAltitude(birdIndex, requiredAltitude);
};

module.exports = commandCenter;
