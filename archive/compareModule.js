// checks for a birdData if the required feature is different from the current state

const compare = (birdData) => {
  const mismatches = [];

  //   if bird at destination
  if (
    birdData.required.position.lat !== birdData.position.lat ||
    birdData.required.position.lng !== birdData.position.lng
  ) {
    mismatches.push({
      tailNum: birdData.tailNum,
      action: "flyTo",
      payload: birdData.required.position,
    });
  }

  // if bird at altitude
  if (birdData.required.altitude !== birdData.altitude) {
    mismatches.push({
      tailNum: birdData.tailNum,
      action: "changeAltitude",
      payload: birdData.required.altitude,
    });
  }

  // if bird at speed
  if (birdData.required.speed !== birdData.speed) {
    mismatches.push({
      tailNum: birdData.tailNum,
      action: "changeSpeed",
      payload: birdData.required.speed,
    });
  }

  return mismatches;
};

export default compare;
