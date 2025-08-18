import { xMinValue, xMultiply } from 'ml-spectra-processing';

import { getFromToIndex } from './getFromToIndex.js';

export function min(matrix, normalizedTarget, range = {}) {
  let fromToIndex = getFromToIndex(normalizedTarget.x, range);

  let targetValue = xMinValue(normalizedTarget.y, fromToIndex);
  let values = matrix.map((row) => xMinValue(row, fromToIndex));

  for (let i = 0; i < matrix.length; i++) {
    let factor = targetValue / values[i];
    matrix[i] = xMultiply(matrix[i], factor);
  }
}
