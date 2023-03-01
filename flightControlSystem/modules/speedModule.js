const { intervalRate } = require("../../config");

const speedModule = (bird) => {
  const currentSpeed = Number(bird.speed);
  const targetSpeed = bird.required.speed;

  if (targetSpeed === null) return currentSpeed;

  const accelerationRate = bird.limits.acceleration;
  const timeInMinutes = intervalRate / (1000 * 60);

  let speedChange;
  if (targetSpeed > currentSpeed)
    speedChange = accelerationRate * timeInMinutes;
  if (targetSpeed < currentSpeed)
    speedChange = -1 * accelerationRate * timeInMinutes;

  const newSpeed = currentSpeed + speedChange;

  if (speedChange >= 0 && newSpeed > targetSpeed) return targetSpeed;
  if (speedChange < 0 && newSpeed < targetSpeed) return targetSpeed;

  return Number(newSpeed).toFixed(4);
};

module.exports = speedModule;
