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

function calculateRangeStats(arr) {
  const totalMakes = arr.reduce(
    (total, next) => total + parseFloat(next.makes),
    0
  );
  const totalAttempts = arr.reduce(
    (total, next) => total + parseFloat(next.attempts),
    0
  );
  return {
    totalMakes,
    totalAttempts,
  };
}

export {
  calculateMakes,
  calculateAttempts,
  calculatePercent,
  calculateRangeStats,
};
