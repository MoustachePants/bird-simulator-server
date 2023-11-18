// this module changes the bird's position ->
// in consideration of its properties and destination

const { intervalRate, nearDistanceInKM } = require("../../config");
const calculateIfFarFromDistance = require("../../utils/calculateDistanceBetweenCoords");
const circleFlightRouteModule = require("../modules/circleFlightRouteModule");

const earthRadius = 6371e3; // Earth's radius in meters

const toRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

const toDegrees = (radians) => {
  return radians * (180 / Math.PI);
};

const flightModule = (birdData) => {
  const currentLocation = birdData.position;
  let speed = birdData.speed;

  // calc the relevant destination
  const ifReachedDestination =
    calculateIfFarFromDistance(
      birdData.position.lat,
      birdData.position.lng,
      birdData.required.position[0].lat,
      birdData.required.position[0].lng
    ) <= nearDistanceInKM;

  let destination, requiredRoute, isCircleFlight, circleCenter;
  destination = birdData.required.position[0];
  isCircleFlight = birdData.state.isCircleFlight;

  if (ifReachedDestination && birdData.required.position.length > 1) {
    requiredRoute = birdData.required.position.slice(1);
  }

  if (ifReachedDestination && birdData.required.position.length === 1) {
    requiredRoute = circleFlightRouteModule(birdData);
    isCircleFlight = true;
    circleCenter = birdData.required.position[0];
  }

  // if (isCircleFlight && ifReachedDestination) {
  //   requiredRoute = circleFlightRouteModule(birdData);
  // }

  // calc plane flight path
  const earthRadius = 6371e3;
  let currentLatitude = (currentLocation.lat * Math.PI) / 180;
  let destinationLatitude = (destination.lat * Math.PI) / 180;
  let latitudeDifference =
    ((destination.lat - currentLocation.lat) * Math.PI) / 180;
  let longitudeDifference =
    ((destination.lng - currentLocation.lng) * Math.PI) / 180;

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
  const lat1 = currentLocation.lat * (Math.PI / 180);
  const lon1 = currentLocation.lng * (Math.PI / 180);
  const lat2 = destination.lat * (Math.PI / 180);
  const lon2 = destination.lng * (Math.PI / 180);

  const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);

  const bearingInRad = Math.atan2(y, x);
  const bearing = ((bearingInRad * 180) / Math.PI + 360) % 360;

  return {
    position: { lat: latitude, lng: longitude },
    bearing,
    requiredRoute,
    isCircleFlight,
    circleCenter,
  };
};

module.exports = flightModule;
