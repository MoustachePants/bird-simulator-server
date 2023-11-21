// this module changes the bird's position ->
// in consideration of its properties and destination

const { intervalRate, nearDistanceInKM } = require("../../config");
const calculateIfFarFromDistance = require("../../utils/calculateDistanceBetweenCoords");
const circleFlightRoutePlanner = require("../circleFlightRoutePlanner");
const { toRadians, toDegrees } = require("../../utils/helpers");

const earthRadius = 6371e3; // Earth's radius in meters

const flightModule = (birdData) => {
  const currentLocation = birdData.position;
  let speed = birdData.speed;

  // calc the relevant flight pattern according to if close to destination and if at circle flight mode
  const ifReachedDestination =
    calculateIfFarFromDistance(
      currentLocation.lat,
      currentLocation.lng,
      birdData.required.position[0].lat,
      birdData.required.position[0].lng
    ) <= nearDistanceInKM;

  let destination, requiredRoute, isCircleFlight, circleCenter;
  destination = birdData.required.position[0];
  isCircleFlight = birdData.state.isCircleFlight;

  if (isCircleFlight && ifReachedDestination) {
    requiredRoute = [
      ...birdData.required.position.slice(1),
      birdData.required.position[0],
    ];
  }

  if (
    !isCircleFlight &&
    ifReachedDestination &&
    birdData.required.position.length > 1
  ) {
    requiredRoute = birdData.required.position.slice(1);
  }

  if (ifReachedDestination && birdData.required.position.length === 1) {
    requiredRoute = circleFlightRoutePlanner(birdData);
    isCircleFlight = true;
    circleCenter = birdData.required.position[0];
  }

  // calc plane flight path
  let currentLatitude = toRadians(currentLocation.lat);
  let destinationLatitude = toRadians(destination.lat);
  let latitudeDifference = toRadians(destination.lat - currentLocation.lat);
  let longitudeDifference = toRadians(destination.lng - currentLocation.lng);

  let latitudeRadian =
    Math.sin(latitudeDifference / 2) * Math.sin(latitudeDifference / 2) +
    Math.cos(currentLatitude) *
      Math.cos(destinationLatitude) *
      Math.sin(longitudeDifference / 2) *
      Math.sin(longitudeDifference / 2);
  let angularDistance =
    2 * Math.atan2(Math.sqrt(latitudeRadian), Math.sqrt(1 - latitudeRadian));
  let totalDistance = earthRadius * angularDistance;

  let totalTime = totalDistance / (speed * 1.852);

  let latitudeDistancePerSecond =
    (destination.lat - currentLocation.lat) / totalTime;
  let longitudeDistancePerSecond =
    (destination.lng - currentLocation.lng) / totalTime;

  const intervalInSeconds = intervalRate / 1000;

  let latitude =
    currentLocation.lat + latitudeDistancePerSecond * intervalInSeconds;
  let longitude =
    currentLocation.lng + longitudeDistancePerSecond * intervalInSeconds;

  // calc plane bearing
  const lat1 = toRadians(currentLocation.lat);
  const lon1 = toRadians(currentLocation.lng);
  const lat2 = toRadians(destination.lat);
  const lon2 = toRadians(destination.lng);

  const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);

  const bearingInRad = Math.atan2(y, x);
  const bearing = (toDegrees(bearingInRad) + 360) % 360;

  return {
    position: { lat: latitude, lng: longitude },
    bearing,
    requiredRoute,
    isCircleFlight,
    circleCenter,
  };
};

module.exports = flightModule;
