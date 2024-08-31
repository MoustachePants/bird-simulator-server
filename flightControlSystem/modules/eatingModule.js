const isPointInsidePolygon = require("../../utils/isPointInsidePolygon");
const feedingAreasData = require("../../MapEntities/feedingAreas");

const eatingModule = (bird) => {
  const birdPosition = [bird.position.lat, bird.position.lng];
  let isEating = false;

  feedingAreasData.forEach((area) => {
    const ifInsideArea = isPointInsidePolygon(birdPosition, area.positions);
    if (ifInsideArea) isEating = true;
  });

  return isEating;
};

module.exports = eatingModule;
