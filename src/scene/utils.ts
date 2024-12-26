export function quarticInOut(amount: number) {
  if ((amount *= 2) < 1) {
    return 0.5 * amount * amount * amount * amount;
  }
  return -0.5 * ((amount -= 2) * amount * amount * amount - 2);
}

export function remap(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  if (value < inMin) value = inMin;
  if (value > inMax) value = inMax;

  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

export function stretchSize(
  originalWidth: number,
  originalHeight: number,
  targetWidth: number,
  targetHeight: number
) {
  const scaleX = targetWidth / originalWidth;
  const scaleY = targetHeight / originalHeight;
  const scale = Math.max(scaleX, scaleY);
  return [scale, scale];
}
