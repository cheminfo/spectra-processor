/**
 * Moves the spectrum with respect to a specific change
 * @param {Array<number>} [spectrum] - The spectrum to be shifted.
 * @param {number} [shift] - The shift to be applied to the spectrum
 */

export function getAligned(spectrum, shift) {
  if (Math.sign(shift) < 0) {
    moveOn(spectrum.y, shift);
  } else {
    moveBack(spectrum.y, shift);
  }
}

function moveBack(spectrum, shift) {
  let length = spectrum.length - 1;
  for (let i = 0; i < shift; i++) {
    spectrum.push(spectrum[length]);
    spectrum.shift();
  }
}

function moveOn(spectrum, shift) {
  shift = Math.abs(shift);
  for (let i = 0; i < shift; i++) {
    spectrum.unshift(spectrum[0]);
    spectrum.pop();
  }
}
