const { toRadians, toDegrees } = require("../utils/helpers");

const circleFlightRoutePlanner = (bird) => {
  const speed = bird.speed;
  const circleRadius = bird.circleRadius;
  const circleCenter = bird.state.circleCenter || bird.required.position[0];

  const earthRadius = 6371e3; // Earth's radius in meters

  // Set a constant to control the point density on the circle
  const pointDensity = 0.000002; // Adjust as needed for the desired density

  // Calculate the angular distance needed based on the circle radius and point density
  const angularDistance = circleRadius / earthRadius;

  // Calculate the number of points based on the circle circumference
  const circumference = 2 * Math.PI * earthRadius;
  const numberOfPoints = Math.ceil(
    (circumference / (speed / 3.6)) * pointDensity
  );

  const centerLat = toRadians(circleCenter.lat);
  const centerLng = toRadians(circleCenter.lng);

  const coordinates = [];

  // Calculate the initial bearing from the bird's position to the first point on the circle
  const initialBearing = Math.atan2(
    Math.sin(centerLng - toRadians(bird.position.lng)) * Math.cos(centerLat),
    Math.cos(toRadians(bird.position.lat)) * Math.sin(centerLat) -
      Math.sin(toRadians(bird.position.lat)) *
        Math.cos(centerLat) *
        Math.cos(centerLng - toRadians(bird.position.lng))
  );

  for (let i = 0; i < numberOfPoints; i++) {
    // Adjust the bearing to start from the initial bearing
    const bearing =
      ((i / numberOfPoints) * 360 + toDegrees(initialBearing) + 360) % 360;
    const angularBearing = toRadians(bearing);

    const lat = Math.asin(
      Math.sin(centerLat) * Math.cos(angularDistance) +
        Math.cos(centerLat) *
          Math.sin(angularDistance) *
          Math.cos(angularBearing)
    );

    const lng =
      centerLng +
      Math.atan2(
        Math.sin(angularBearing) *
          Math.sin(angularDistance) *
          Math.cos(centerLat),
        Math.cos(angularDistance) - Math.sin(centerLat) * Math.sin(lat)
      );

    coordinates.push({ lat: toDegrees(lat), lng: toDegrees(lng) });
  }

  // Add the first coordinate to the end to complete the circle
  coordinates.push(coordinates[0]);

  return coordinates;
};

module.exports = circleFlightRoutePlanner;
