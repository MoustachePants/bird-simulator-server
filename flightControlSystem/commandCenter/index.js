const birds = require("../birdsData");
const birdFinder = require("../../utils/birdFinder");

const flyTo = (birdIndex, requiredPosition) => {
  birds[birdIndex].required.position = requiredPosition;
};

const commandCenter = (commandBody) => {
  const { tailNum, requiredPosition, requiredSpeed, requiredAltitude } =
    commandBody;

  const { bird, birdIndex } = birdFinder(tailNum);

  if (requiredPosition) flyTo(birdIndex, requiredPosition);
};

module.exports = commandCenter;
