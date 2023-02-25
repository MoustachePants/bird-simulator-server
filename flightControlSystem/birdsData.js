const birdsData = [
  {
    tailNum: 1,
    name: "Pigeon",
    type: "bird",
    speed: 10, //knots
    altitude: 100, //feet
    radius: 1000,
    bearing: 360,
    position: {
      lat: 32.87202089375999,
      lng: 35.609204061655724,
    },
    limits: {
      speed: { min: 5, max: 20 },
      altitude: { min: 0, max: 1500 },
    },
    rateOfClimb: 50, //feet per minute
    ifFarFromDestination: true,
    required: {
      position: {
        lat: 32.557334991568034,
        lng: 35.538176269586124,
      },
      speed: 50,
      altitude: 1000,
    },
  },
  {
    tailNum: 2,
    name: "Bee",
    type: "bee",
    speed: 4, //knots
    altitude: 70, //feet
    radius: 1000,
    bearing: 360,
    position: {
      lat: 32.37202089375999,
      lng: 35.709204061655724,
    },
    limits: {
      speed: { min: 1, max: 10 },
      altitude: { min: 0, max: 100 },
    },
    rateOfClimb: 1, //feet per minute
    ifFarFromDestination: true,
    required: {
      position: {
        lat: 32.557334991568034,
        lng: 35.538176269586124,
      },
      speed: 50,
      altitude: 80,
    },
  },
  {
    tailNum: 3,
    name: "Butterfly",
    type: "butterfly",
    speed: 6, //knots
    altitude: 40, //feet
    radius: 1000,
    bearing: 360,
    position: {
      lat: 32.27202089375999,
      lng: 35.309204061655724,
    },
    limits: {
      speed: { min: 1, max: 15 },
      altitude: { min: 0, max: 200 },
    },
    rateOfClimb: 1, //feet per minute
    ifFarFromDestination: true,
    required: {
      position: {
        lat: 32.557334991568034,
        lng: 35.538176269586124,
      },
      speed: 50,
      altitude: 20,
    },
  },
];

module.exports = birdsData;
