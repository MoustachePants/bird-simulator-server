const { intervalRate } = require("../config");

const circleFlightModule = (birdData) => {
  const currentLocation = birdData.position;
  const destination = birdData.required.position;
  const radius = birdData.radius;
  let speed = birdData.speed;
  let interval = intervalRate;

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

  let latitude = currentLocation.lat + latitudeDistancePerSecond * interval;
  let longitude = currentLocation.lng + longitudeDistancePerSecond * interval;

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

  // calc position around destination
  const angle = (interval * 360) / (totalTime * 1000);
  const radianAngle = (angle * Math.PI) / 180;
  latitude =
    destination.lat +
    ((radius * Math.sin(radianAngle)) / earthRadius) * (180 / Math.PI);
  longitude =
    destination.lng +
    ((radius * Math.cos(radianAngle)) /
      (earthRadius * Math.cos((latitude * Math.PI) / 180))) *
      (180 / Math.PI);

  return { position: { lat: latitude, lng: longitude }, bearing };
};

module.exports = circleFlightModule;
