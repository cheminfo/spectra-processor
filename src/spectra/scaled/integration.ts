import type { DataXY, DoubleArray, FromTo } from 'cheminfo-types';
import type {
  DoubleMatrix,
  XGetFromToIndexOptions,
} from 'ml-spectra-processing';
import { xGetFromToIndex, xMultiply, xSum } from 'ml-spectra-processing';

/**
 * Scale matrix rows to match integration (sum) of target
 * @param matrix - Matrix to scale (modified in place)
 * @param normalizedTarget - Target data with x and y arrays
 * @param range - Optional range to consider
 */
export function integration(
  matrix: DoubleMatrix,
  normalizedTarget: DataXY,
  range: XGetFromToIndexOptions = {},
): void {
  const fromToIndex = xGetFromToIndex(normalizedTarget.x as DoubleArray, range);

  const targetValue = xSum(normalizedTarget.y as DoubleArray, fromToIndex);
  const values = matrix.map((row) => xSum(row, fromToIndex));

  for (let i = 0; i < matrix.length; i++) {
    const factor = targetValue / values[i];
    matrix[i] = xMultiply(matrix[i], factor);
  }
}
