const birdsData = [
  {
    tailNum: 1,
    name: "Stork",
    summery:
      "The white stork migrates through Israel from Europe to Africa, stopping to rest and refuel on its journey. Watching this graceful bird in flight is a marvel of nature, as it perseveres on its long journey to reach its wintering grounds.",
    type: "bird", // bird types are: bird, bee, butterfly
    speed: 10, //knots
    altitude: 100, //feet
    radius: 1000,
    bearing: 360,
    calories: { current: 16161, averageBurnedPerMinute: 10 },
    position: {
      lat: 32.87202089375999,
      lng: 35.609204061655724,
    },
    state: {
      ifFarFromDestination: true,
      isClimbing: false,
      isDescending: false,
      isEating: false,
    },
    limits: {
      speed: { min: 5, max: 20 },
      altitude: { min: 0, max: 1500 },
      acceleration: 50, //knots per minute
      maxCalories: 1000,
    },
    rateOfClimb: 50, //feet per minute
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
