import getRandomSample from "./getRandomSample";

test("handles null array", () => {
  let sample = getRandomSample(null, 1);
  expect(sample).toBe(null);
});

test("handles 0 length array", () => {
  let sample = getRandomSample([], 1);
  expect(sample).toEqual([]);
});

test("handles 1 length array", () => {
  let sample = getRandomSample([1], 1);
  expect(sample).toEqual([1]);
});

test("handles 5 items", () => {
  let sample = getRandomSample([1, 2, 3, 4, 5], 2);
  expect(sample.length).toBe(2);
});

test("can return 0", () => {
  let sample = getRandomSample([1, 2, 3, 4, 5], 0);
  expect(sample.length).toBe(0);
});

test("can't return more than the length", () => {
  let sample = getRandomSample([1, 2, 3, 4, 5], 10);
  expect(sample.length).toBe(5);
});
