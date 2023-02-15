const birdsData = [
  {
    tailNum: 1,
    speed: 10, //knots
    altitude: 100, //feet
    radius: 1000,
    bearing: 360,
    position: {
      lat: 32.82264172432873,
      lng: 34.97441650419942,
    },
    rateOfClimbAtMinSpeed: 50, //feet per minute
    ifFarFromDestination: true,
    required: {
      position: {
        lat: 31.053187993491434,
        lng: 34.87229287422616,
      },
      speed: 50,
      altitude: 1000,
    },
  },
];

module.exports = birdsData;
