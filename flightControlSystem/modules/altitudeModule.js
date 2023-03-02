const { intervalRate } = require("../../config");

function altitudeModule(birdData) {
  const altitude = Number(birdData.altitude);
  const rateOfClimb = Number(birdData.rateOfClimb);
  const requiredAltitude = Number(
    birdData.required.altitude || birdData.altitude
  );

  if (altitude === requiredAltitude)
    return { newAltitude: altitude, isClimbing: false, isDescending: false };

  const timeInMinutes = intervalRate / (1000 * 60);
  const isClimbing = requiredAltitude - altitude > 0;

  let altitudeChange;
  if (isClimbing) altitudeChange = rateOfClimb * timeInMinutes;
  else altitudeChange = -rateOfClimb * timeInMinutes;

  const newAltitude = altitude + altitudeChange;

  if (isClimbing && newAltitude >= requiredAltitude) {
    return {
      newAltitude: requiredAltitude,
      isClimbing: false,
      isDescending: false,
    };
  }
  if (!isClimbing && newAltitude <= requiredAltitude) {
    return {
      newAltitude: requiredAltitude,
      isClimbing: false,
      isDescending: false,
    };
  }

  // console.log(newAltitude);

  return {
    newAltitude: Number(newAltitude).toFixed(4),
    isClimbing,
    isDescending: !isClimbing,
  };
}

module.exports = altitudeModule;
