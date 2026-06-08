export const WEIGHT_PRESETS = [0.2, 0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

export function formatWeight(kgValue) {
  if (kgValue < 1) {
    return `${Math.round(kgValue * 1000)} gr`;
  }
  return `${kgValue} kg`;
}
