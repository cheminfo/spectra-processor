import { XY, X } from 'ml-spectra-processing';

export function range(spectra, targetSpectrum, range = {}) {
  let { from, to } = range;
  if (from === undefined) {
    throw new Error('getScaledChart: `from` as to be defined');
  }
  if (to === undefined) to = from;

  let fromToIndex = {
    fromIndex: X.findClosestIndex(targetSpectrum.normalized.x, from),
    toIndex: X.findClosestIndex(targetSpectrum.normalized.x, to)
  };

  let targetValue = XY.integration(targetSpectrum.normalized, fromToIndex);

  let values = spectra.map((spectrum) =>
    XY.integration(spectrum.normalized, fromToIndex)
  );

  let matrix = [];
  for (let i = 0; i < spectra.length; i++) {
    let spectrum = spectra[i];
    let factor = targetValue / values[i];
    matrix.push(X.multiply(spectrum.normalized.y, factor));
  }

  return matrix;
}
