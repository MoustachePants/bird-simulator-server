const birds = require("./birdsData");
const { intervalRate } = require("../config");
const birdFinder = require("../utils/birdFinder");
const flightModule = require("./modules/flightModule");
// const circleFlightModule = require("./modules/circleFlightModule");
const altitudeModule = require("./modules/altitudeModule");

const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const startInterval = async () => {
  while (true) {
    birds.forEach((bird) => {
      const { birdIndex } = birdFinder(bird.tailNum);

      let newPosition, newBearing;

      if (bird.ifFarFromDestination) {
        const { position, bearing } = flightModule(bird);
        newPosition = position;
        newBearing = bearing;

        birds[birdIndex].position.lat = newPosition.lat;
        birds[birdIndex].position.lng = newPosition.lng;
        birds[birdIndex].bearing = newBearing;
      }
      // if (!bird.ifFarFromDestination) {
      //   const { position, bearing } = circleFlightModule(bird);
      //   newPosition = position;
      //   newBearing = bearing;
      // }

      if (bird.altitude !== bird.required.altitude) {
        const newAltitude = altitudeModule(bird);
        birds[birdIndex].altitude = newAltitude;
      }
    });
    await timeout(intervalRate);
  }
};

module.exports = startInterval;

// Math.abs(bird.position.lat - bird.required.position.lat) > 0.006 ||
// Math.abs(bird.position.lng - bird.required.position.lng) > 0.006
