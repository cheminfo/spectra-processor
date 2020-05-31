import { xyIntegration, xMultiply } from 'ml-spectra-processing';

import { getFromToIndex } from './getFromToIndex';

export function range(spectra, targetSpectrum, currentrange = {}) {
  let fromToIndex = getFromToIndex(targetSpectrum.normalized.x, currentrange);

  let targetValue = xyIntegration(targetSpectrum.normalized, fromToIndex);

  let values = spectra.map((spectrum) =>
    xyIntegration(spectrum.normalized, fromToIndex),
  );

  let matrix = [];
  for (let i = 0; i < spectra.length; i++) {
    let spectrum = spectra[i];
    let factor = targetValue / values[i];
    matrix.push(xMultiply(spectrum.normalized.y, factor));
  }

  return matrix;
}
