const {
  intervalRate,
  caloriesGainPerSecondWhenEating,
} = require("../../config");

const caloriesModule = (bird) => {
  const speed = bird.speed;
  const isClimbing = bird.state.isClimbing;
  const isDescending = bird.state.isDescending;
  const currentCalories = bird.calories.current;
  const isEating = bird.state.isEating;
  const maxCalories = bird.limits.maxCalories;

  const minuteFactor = 60000 / intervalRate;
  const secondFactor = 1000 / intervalRate;
  const caloriesFactor = 0.0001;

  if (isEating && currentCalories < maxCalories) {
    return {
      remainingCalories:
        Number(currentCalories) + caloriesGainPerSecondWhenEating,
      caloriesPerMinute: 20 * minuteFactor,
    };
  }

  if (isEating && currentCalories >= maxCalories) {
    return { remainingCalories: Number(maxCalories), caloriesPerMinute: 0 };
  }

  // calculate the calories burned based on the bird speed and whether it's rising or not
  const caloriesBurned =
    speed *
    (isClimbing ? 2 : isDescending ? 0.5 : 1) *
    intervalRate *
    caloriesFactor;

  const caloriesPerMinute = (caloriesBurned * minuteFactor).toFixed(0);

  // subtract the calories burned from the current calories value
  const remainingCalories = (currentCalories - caloriesBurned).toFixed(0);

  // return the remaining calories value
  return { remainingCalories, caloriesPerMinute };
};

module.exports = caloriesModule;
