import { XY, X } from 'ml-spectra-processing';

import { getFromToIndex } from './getFromToIndex';

export function min(spectra, targetSpectrum, range = {}) {
  let fromToIndex = getFromToIndex(targetSpectrum.normalized.x, range);

  let targetValue = XY.minYPoint(targetSpectrum.normalized, fromToIndex).y;

  let values = spectra.map(
    (spectrum) => XY.minYPoint(spectrum.normalized, fromToIndex).y,
  );

  let matrix = [];
  for (let i = 0; i < spectra.length; i++) {
    let spectrum = spectra[i];
    let factor = targetValue / values[i];
    matrix.push(X.multiply(spectrum.normalized.y, factor));
  }

  return matrix;
}
