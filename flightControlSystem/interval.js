const birds = require("./birdsData");
const { intervalRate } = require("../config");
const birdFinder = require("../utils/birdFinder");
const flightModule = require("./flightModule");
const circleFlightModule = require("./circleFlightModule");

const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const startInterval = async () => {
  while (true) {
    birds.forEach((bird) => {
      let newPosition, newBearing;

      if (bird.ifFarFromDestination) {
        const { position, bearing } = flightModule(bird);
        newPosition = position;
        newBearing = bearing;
      }
      if (!bird.ifFarFromDestination) {
        const { position, bearing } = circleFlightModule(bird);
        newPosition = position;
        newBearing = bearing;
      }

      const { birdIndex } = birdFinder(bird.tailNum);

      birds[birdIndex].position.lat = newPosition.lat;
      birds[birdIndex].position.lng = newPosition.lng;
      birds[birdIndex].bearing = newBearing;
    });
    await timeout(intervalRate);
  }
};

module.exports = startInterval;

// Math.abs(bird.position.lat - bird.required.position.lat) > 0.006 ||
// Math.abs(bird.position.lng - bird.required.position.lng) > 0.006
