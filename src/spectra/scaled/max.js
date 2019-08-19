import { XY, X } from 'ml-spectra-processing';

export function max(spectra, targetSpectrum, range = {}) {
  let { from, to } = range;
  if (from === undefined) {
    throw new Error('getScaledChart: `from` as to be defined');
  }
  if (to === undefined) to = from;

  let fromToIndex = {
    fromIndex: X.findClosestIndex(targetSpectrum.normalized.x, from),
    toIndex: X.findClosestIndex(targetSpectrum.normalized.x, to)
  };

  let targetValue = XY.maxYPoint(targetSpectrum.normalized, fromToIndex).y;

  let values = spectra.map(
    (spectrum) => XY.maxYPoint(spectrum.normalized, fromToIndex).y
  );

  let matrix = [];
  for (let i = 0; i < spectra.length; i++) {
    let spectrum = spectra[i];
    let factor = targetValue / values[i];
    matrix.push(X.multiply(spectrum.normalized.y, factor));
  }

  return matrix;
}
