const calculateCaloriesBurned = (
  speed,
  isClimbing,
  isDescending,
  currentCalories,
  interval
) => {
  // calculate the calories burned based on the bird speed and whether it's rising or not
  let caloriesBurned =
    speed * (isClimbing ? 2 : isDescending ? 0.5 : 1) * interval;

  // subtract the calories burned from the current calories value
  let remainingCalories = currentCalories - caloriesBurned;

  // return the remaining calories value
  return remainingCalories;
};
