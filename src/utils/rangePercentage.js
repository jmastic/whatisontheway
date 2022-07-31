export function getNumberAtRangePercent(percentage, max, min) {
  let num = percentage * (max - min) + min;
  if (num > max) {
    num = max;
  } else if (num < 0) {
    num = 0;
  }
  return num;
}

export function getPercentageInRange(input, max, min) {
  let percentage = (input - min) / (max - min);
  if (percentage > 1) {
    percentage = 1;
  } else if (percentage < 0) {
    percentage = 0;
  }
  return percentage;
}
