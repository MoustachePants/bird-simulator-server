const { intervalRate } = require("../../config");

function altitudeModule(birdData) {
  const altitude = birdData.altitude;
  const rateOfClimb = birdData.rateOfClimb;
  const requiredAltitude = birdData.required.altitude;

  const timeInMinutes = intervalRate / (1000 * 60);
  const ifAscend = requiredAltitude - altitude >= 0;

  let altitudeChange;
  if (ifAscend) altitudeChange = rateOfClimb * timeInMinutes;
  else altitudeChange = -rateOfClimb * timeInMinutes;

  const newAltitude = altitude + altitudeChange;

  if (ifAscend && newAltitude >= requiredAltitude) {
    return requiredAltitude;
  }
  if (!ifAscend && newAltitude <= requiredAltitude) {
    return requiredAltitude;
  }

  return Number(newAltitude.toFixed(4));
}

module.exports = altitudeModule;
