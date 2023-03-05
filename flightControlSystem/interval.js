const birds = require("./birdsData");
const { intervalRate } = require("../config");
const birdFinder = require("../utils/birdFinder");
const flightModule = require("./modules/flightModule");
// const circleFlightModule = require("./modules/circleFlightModule");
const altitudeModule = require("./modules/altitudeModule");
const speedModule = require("./modules/speedModule");
const caloriesModule = require("./modules/caloriesModule");
const eatingModule = require("./modules/eatingModule");

const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const startInterval = async () => {
  while (true) {
    birds.forEach((bird) => {
      const { birdIndex } = birdFinder(bird.tailNum);

      // Position Change - flight module
      let newPosition, newBearing;

      if (bird.state.ifFarFromDestination) {
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

      // Altitude Change - altitude module
      if (bird.altitude !== bird.required.altitude) {
        const { newAltitude, isClimbing, isDescending } = altitudeModule(bird);
        birds[birdIndex].altitude = newAltitude;
        birds[birdIndex].state.isClimbing = isClimbing;
        birds[birdIndex].state.isDescending = isDescending;
      } else bird.required.altitude = null;

      // Speed change - speed module
      if (bird.speed !== bird.required.speed) {
        const newSpeed = speedModule(bird);
        birds[birdIndex].speed = newSpeed;
      } else bird.required.speed = null;

      // Calories change - calories module
      const { remainingCalories, caloriesPerMinute } = caloriesModule(bird);
      birds[birdIndex].calories.current = remainingCalories;
      birds[birdIndex].calories.averageBurnedPerMinute = caloriesPerMinute;

      //   Eating module
      const isEating = eatingModule(bird);
      birds[birdIndex].state.isEating = isEating;
    });
    await timeout(intervalRate);
  }
};

module.exports = startInterval;

// Math.abs(bird.position.lat - bird.required.position.lat) > 0.006 ||
// Math.abs(bird.position.lng - bird.required.position.lng) > 0.006
