function calculateMakes(currentMakes, newMakes) {
  return parseFloat(currentMakes) + parseFloat(newMakes);
}

function calculateAttempts(currentAttempts) {
  return currentAttempts + 10;
}

function calculatePercent(currentMakes, newMakes, currentAttempts) {
  return Math.round(
    (calculateMakes(currentMakes, newMakes) /
      calculateAttempts(currentAttempts)) *
      100
  );
}

export { calculateMakes, calculateAttempts, calculatePercent };
