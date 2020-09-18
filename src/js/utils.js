export default function round(nubmer) {
  const result = Math.round(nubmer * 100) / 100;
  return result.toFixed(2);
}
