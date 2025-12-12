import type { DataXY, DoubleArray } from 'cheminfo-types';
import type { DoubleMatrix } from 'ml-spectra-processing';
import { xMultiply, xSum } from 'ml-spectra-processing';

import type { Range } from './getFromToIndex.js';
import { getFromToIndex } from './getFromToIndex.js';

/**
 * Scale matrix rows to match integration (sum) of target
 * @param matrix - Matrix to scale (modified in place)
 * @param normalizedTarget - Target data with x and y arrays
 * @param range - Optional range to consider
 */
export function integration(
  matrix: DoubleMatrix,
  normalizedTarget: DataXY,
  range: Range = {},
): void {
  const fromToIndex = getFromToIndex(normalizedTarget.x as DoubleArray, range);

  const targetValue = xSum(normalizedTarget.y as DoubleArray, fromToIndex);
  const values = matrix.map((row) => xSum(row as DoubleArray, fromToIndex));

  for (let i = 0; i < matrix.length; i++) {
    const factor = targetValue / values[i];
    matrix[i] = xMultiply(matrix[i] as DoubleArray, factor);
  }
}
