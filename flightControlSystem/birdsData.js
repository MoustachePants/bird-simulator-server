const { ifRandomBirdData } = require("../config");

let birdsData = [
  {
    tailNum: 1,
    name: "Stork",
    summery:
      "The white stork migrates through Israel from Europe to Africa, stopping to rest and refuel on its journey. Watching this graceful bird in flight is a marvel of nature, as it perseveres on its long journey to reach its wintering grounds.",
    type: "bird", // bird types are: bird, bee, butterfly
    speed: 40, //knots
    altitude: 100, //feet
    circleRadius: 400,
    bearing: 360,
    calories: { current: 2000, averageBurnedPerMinute: 10 },
    position: {
      lat: 32.84949431435908,
      lng: 34.97669664788461,
    },
    state: {
      ifFarFromDestination: true,
      isCircleFlight: false,
      circleCenter: { lat: null, lng: null },
      isClimbing: false,
      isDescending: false,
      isEating: false,
    },
    limits: {
      speed: { min: 5, max: 20 },
      altitude: { min: 50, max: 1500 },
      acceleration: 50, //knots per minute
      maxCalories: 10000,
    },
    rateOfClimb: 50, //feet per minute
    required: {
      position: [
        {
          lat: null,
          lng: null,
        },
      ],
      speed: null,
      altitude: null,
    },
  },
];

if (ifRandomBirdData) {
  const birdNames = [
    "Stork",
    "Eagle",
    "Sparrow",
    "Pigeon",
    "Hawk",
    "Pelican",
    "Falcon",
    "Dove",
    "Owl",
    "Swan",
  ];

  const birdSummaries = [
    "The white stork migrates through Israel from Europe to Africa, stopping to rest and refuel on its journey. Watching this graceful bird in flight is a marvel of nature, as it perseveres on its long journey to reach its wintering grounds.",
    "The eagle is a majestic bird of prey found all around the world. With its sharp talons and powerful wings, it is a symbol of strength and freedom.",
    "The sparrow is a small, unassuming bird that can be found in many parts of the world. While it may not be as flashy as some other birds, its sweet song and cute appearance have won the hearts of many.",
    "The pigeon is a common bird found in cities around the world. While some people view them as pests, others appreciate their gentle cooing and distinctive appearance.",
    "The hawk is a fierce bird of prey known for its keen eyesight and sharp talons. With its impressive hunting skills, it is a top predator in many ecosystems.",
    "The pelican is a large water bird that can be found in many parts of the world. With its distinctive beak and clumsy gait, it is a favorite of birdwatchers and nature enthusiasts.",
    "The falcon is a fast and agile bird of prey that can be found all around the world. With its sharp talons and powerful wings, it is a top predator in many ecosystems.",
    "The dove is a symbol of peace and love in many cultures around the world. With its gentle cooing and graceful flight, it is a favorite of many bird lovers.",
    "The owl is a nocturnal bird of prey known for its distinctive hooting call and large, expressive eyes. With its keen hearing and silent flight, it is a master of the night sky.",
    "The swan is a graceful water bird known for its long neck and beautiful plumage. With its elegant appearance and regal bearing, it is a favorite of many birdwatchers.",
  ];

  for (let i = 1; i < 10; i++) {
    const latitude = 31.503534502412134 + Math.random() * 3;
    const longitude = 34.63694166887225 + Math.random() * 3;
    const requiredLatitude = latitude + Math.random() * 2 - 1;
    const requiredLongitude = longitude + Math.random() * 2 - 1;
    const maxSpeed = 5 + Math.floor(5 + Math.random() * 20);
    const maxHeight = 50 + Math.floor(1 + Math.random() * 100) * 50;

    birdsData.push({
      tailNum: i + 1,
      name: birdNames[i],
      summery: birdSummaries[i],
      type: "bird",
      speed: 5 + Math.random() * (maxSpeed - 5),
      altitude: 50 + Math.floor(Math.random() * 15) * 50,
      circleRadius: 1000,
      bearing: 360,
      calories: {
        current: 2000 + Math.floor(Math.random() * 7000),
        averageBurnedPerMinute: 10,
      },
      position: {
        lat: latitude,
        lng: longitude,
      },
      state: {
        ifFarFromDestination: true,
        isCircleFlight: false,
        circleCenter: { lat: null, lng: null },
        isClimbing: false,
        isDescending: false,
        isEating: false,
      },
      limits: {
        speed: { min: 5, max: maxSpeed },
        altitude: { min: 50, max: maxHeight },
        acceleration: 50, //knots per minute
        maxCalories: 10000,
      },
      rateOfClimb: 50, //feet per minute
      required: {
        position: [
          {
            lat: requiredLatitude,
            lng: requiredLongitude,
          },
        ],
        speed: null,
        altitude: null,
      },
    });
  }
}

module.exports = birdsData;
