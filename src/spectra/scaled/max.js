import { xMaxValue, xMultiply } from 'ml-spectra-processing';

import { getFromToIndex } from './getFromToIndex';

export function max(matrix, normalizedTarget, range = {}) {
  let fromToIndex = getFromToIndex(normalizedTarget.x, range);

  let targetValue = xMaxValue(normalizedTarget.y, fromToIndex);
  let values = matrix.map((row) => xMaxValue(row, fromToIndex));

  for (let i = 0; i < matrix.length; i++) {
    let factor = targetValue / values[i];
    matrix[i] = xMultiply(matrix[i], factor);
  }
}
