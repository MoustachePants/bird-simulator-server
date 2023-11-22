const birds = require("./birdsData");
const birdFinder = require("../utils/birdFinder");

const flyTo = (birdIndex, requiredPosition) => {
  birds[birdIndex].required.position = [requiredPosition];
  birds[birdIndex].state.isCircleFlight = false;
  birds[birdIndex].state.circleCenter = { lat: null, lng: null };
};

const addPositionToRoute = (birdIndex, requiredRoutePosition) => {
  if (!birds[birdIndex].state.isCircleFlight)
    birds[birdIndex].required.position.push(requiredRoutePosition);
};

const changeSpeed = (birdIndex, requiredSpeed) => {
  birds[birdIndex].required.speed = requiredSpeed;
};

const changeAltitude = (birdIndex, requiredAltitude) => {
  birds[birdIndex].required.altitude = requiredAltitude;
};

const commandCenter = (commandBody) => {
  let {
    tailNum,
    requiredPosition,
    requiredRoutePosition,
    requiredSpeed,
    requiredAltitude,
  } = commandBody;

  const { birdIndex } = birdFinder(tailNum);

  if (requiredPosition) flyTo(birdIndex, requiredPosition);
  if (requiredRoutePosition)
    addPositionToRoute(birdIndex, requiredRoutePosition);
  if (requiredSpeed) changeSpeed(birdIndex, requiredSpeed);
  if (requiredAltitude) changeAltitude(birdIndex, requiredAltitude);
};

module.exports = commandCenter;
