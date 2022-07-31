export default function getRandomSample(inArray, sampleSize) {
  if (!inArray) {
    return null;
  }
  const shuffled = [...inArray].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, sampleSize);
}
