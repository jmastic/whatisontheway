import { getNumberAtRangePercent, getPercentageInRange } from "./rangePercentage";

test("getNumberAtRangePercent returns correct value", () => {
  let number = getNumberAtRangePercent(0.5, 100, 0);
  expect(number).toBe(50);
});

test("getNumberAtRangePercent returns max if over range", () => {
  let number = getNumberAtRangePercent(100, 100, 0);
  expect(number).toBe(100);
});

test("getNumberAtRangePercent returns min if under range", () => {
  let number = getNumberAtRangePercent(-1, 100, 0);
  expect(number).toBe(0);
});

test("getPercentageInRange returns correct range value", () => {
  let number = getPercentageInRange(50, 100, 0);
  expect(number).toBe(0.5);
});

test("getPercentageInRange returns 0% if under range", () => {
  let number = getPercentageInRange(50, 100, 75);
  expect(number).toBe(0);
});

test("getPercentageInRange returns 100% if over range", () => {
  let number = getPercentageInRange(200, 100, 0);
  expect(number).toBe(1);
});
