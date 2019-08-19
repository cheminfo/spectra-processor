import { XY } from 'ml-spectra-processing';
import SimpleLinearRegression from 'ml-regression-simple-linear';

import { getFromToIndex } from './getFromToIndex';

export function minMax(spectra, targetSpectrum, range = {}) {
  let fromToIndex = getFromToIndex(targetSpectrum.normalized.x, range);

  let targetValue = {
    min: XY.minYPoint(targetSpectrum.normalized, fromToIndex).y,
    max: XY.maxYPoint(targetSpectrum.normalized, fromToIndex).y
  };

  let values = spectra.map((spectrum) => {
    return {
      min: XY.minYPoint(spectrum.normalized, fromToIndex).y,
      max: XY.maxYPoint(spectrum.normalized, fromToIndex).y
    };
  });

  let matrix = [];
  for (let i = 0; i < spectra.length; i++) {
    let spectrum = spectra[i];
    const regression = new SimpleLinearRegression(
      [targetValue.min, targetValue.max],
      [values[i].min, values[i].max]
    );

    let length = spectrum.normalized.y.length;
    let scaled = new Array(length);
    for (let j = 0; j < length; j++) {
      scaled[j] = regression.computeX(spectrum.normalized.y[j]);
    }
    matrix.push(scaled);
  }

  return matrix;
}
