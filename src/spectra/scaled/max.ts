import type { DataXY, DoubleArray, DoubleMatrix } from 'cheminfo-types';
import type { XGetFromToIndexOptions } from 'ml-spectra-processing';
import { xGetFromToIndex, xMaxValue, xMultiply } from 'ml-spectra-processing';

/**
 * Scale matrix rows to match maximum value of target
 * @param matrix - Matrix to scale (modified in place)
 * @param normalizedTarget - Target data with x and y arrays
 * @param range - Optional range to consider
 */
export function max(
  matrix: DoubleMatrix,
  normalizedTarget: DataXY,
  range: XGetFromToIndexOptions = {},
): void {
  const fromToIndex = xGetFromToIndex(normalizedTarget.x as DoubleArray, range);

  const targetValue = xMaxValue(normalizedTarget.y as DoubleArray, fromToIndex);
  const values = matrix.map((row) => xMaxValue(row, fromToIndex));

  for (let i = 0; i < matrix.length; i++) {
    const factor = targetValue / values[i];
    matrix[i] = xMultiply(matrix[i], factor);
  }
}
