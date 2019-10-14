import { XY, X } from 'ml-spectra-processing';

import { getFromToIndex } from './getFromToIndex';

export function range(spectra, targetSpectrum, range = {}) {
  let fromToIndex = getFromToIndex(targetSpectrum.normalized.x, range);

  let targetValue = XY.integration(targetSpectrum.normalized, fromToIndex);

  let values = spectra.map((spectrum) =>
    XY.integration(spectrum.normalized, fromToIndex),
  );

  let matrix = [];
  for (let i = 0; i < spectra.length; i++) {
    let spectrum = spectra[i];
    let factor = targetValue / values[i];
    matrix.push(X.multiply(spectrum.normalized.y, factor));
  }

  return matrix;
}
