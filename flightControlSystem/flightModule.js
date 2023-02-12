// this module changes the bird's position ->
// in consideration of its properties and destination

const { intervalRate } = require("../config");

const earthRadius = 6371e3; // Earth's radius in meters

const toRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

const toDegrees = (radians) => {
  return radians * (180 / Math.PI);
};

const flightModule = (birdData) => {
  const currentLocation = birdData.position;
  const destination = birdData.required.position;
  let speed = birdData.speed;
  // calc plane flight path

  let earthRadius = 6371e3;
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
  const x =
    Math.cos(destination.lat) * Math.sin(destination.lng - currentLocation.lng);
  const y =
    Math.cos(currentLocation.lat) * Math.sin(destination.lat) -
    Math.sin(currentLocation.lat) *
      Math.cos(destination.lat) *
      Math.cos(destination.lng - currentLocation.lng);
  const bearingInRad = Math.atan2(x, y);
  const bearing = (bearingInRad * 180) / Math.PI;

  return { position: { lat: latitude, lng: longitude }, bearing };
};

module.exports = flightModule;
