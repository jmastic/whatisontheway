// Will take in a range and a percent
// Returns the number at the percentage within the range
export function getNumberAtRangePercent(percentage, max, min) {
  let num = percentage * (max - min) + min;
  if (num > max) {
    num = max;
  } else if (num < 0) {
    num = 0;
  }
  return num;
}

// Will take in a range and a number
// Returns the relative percentage of the input number within the input range
export function getPercentageInRange(input, max, min) {
  let percentage = (input - min) / (max - min);
  if (percentage > 1) {
    percentage = 1;
  } else if (percentage < 0) {
    percentage = 0;
  }
  return percentage;
}
