const { intervalRate } = require("../../config");

function altitudeModule(birdData) {
  const altitude = Number(birdData.altitude);
  const rateOfClimb = Number(birdData.rateOfClimb);
  const requiredAltitude = Number(
    birdData.required.altitude || birdData.altitude
  );

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

  console.log(newAltitude);

  return Number(newAltitude).toFixed(4);
}

// function altitudeModule(birdData) {
//   const altitude = birdData.altitude;
//   const rateOfClimb = birdData.rateOfClimb;
//   const requiredAltitude = birdData.required.altitude || birdData.altitude;
//
//   console.log("altitude:", altitude);
//   console.log("rateOfClimb:", rateOfClimb);
//   console.log("requiredAltitude:", requiredAltitude);
//
//   const timeInMinutes = intervalRate / (1000 * 60);
//   console.log("timeInMinutes:", timeInMinutes);
//
//   const ifAscend = requiredAltitude - altitude >= 0;
//
//   console.log("ifAscend:", ifAscend);
//
//   let altitudeChange;
//   if (ifAscend) altitudeChange = rateOfClimb * timeInMinutes;
//   else altitudeChange = -rateOfClimb * timeInMinutes;
//
//   console.log("altitudeChange:", altitudeChange);
//
//   const newAltitude = altitude + altitudeChange;
//
//   console.log("newAltitude:", newAltitude);
//
//   if (ifAscend && newAltitude >= requiredAltitude) {
//     return requiredAltitude;
//   }
//   if (!ifAscend && newAltitude <= requiredAltitude) {
//     return requiredAltitude;
//   }
//
//   const roundedAltitude = Number(newAltitude.toFixed(4));
//   console.log("roundedAltitude:", roundedAltitude);
//
//   return roundedAltitude;
// }

module.exports = altitudeModule;
