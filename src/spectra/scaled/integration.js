import { xSum, xMultiply } from 'ml-spectra-processing';

import { getFromToIndex } from './getFromToIndex';

export function integration(matrix, normalizedTarget, range = {}) {
  let fromToIndex = getFromToIndex(normalizedTarget.x, range);

  let targetValue = xSum(normalizedTarget.y, fromToIndex);
  let values = matrix.map((row) => xSum(row, fromToIndex));

  for (let i = 0; i < matrix.length; i++) {
    let factor = targetValue / values[i];
    matrix[i] = xMultiply(matrix[i], factor);
  }
}
