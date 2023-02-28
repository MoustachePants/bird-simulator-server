const birdsData = [
  {
    tailNum: 1,
    name: "Pigeon",
    type: "bird", // bird types are: bird, bee, butterfly
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
      acceleration: 10, //knots per minute
    },
    rateOfClimb: 50, //feet per minute
    ifFarFromDestination: true,
    required: {
      position: {
        lat: null,
        lng: null,
      },
      speed: null,
      altitude: null,
    },
  },
];

module.exports = birdsData;
