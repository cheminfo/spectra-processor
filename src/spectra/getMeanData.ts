import type {
  DataXMatrix,
  DataXY,
  DoubleArray,
  DoubleMatrix,
} from 'cheminfo-types';
import { Matrix } from 'ml-matrix';

/**
 * Calculate mean of normalized data
 * @param normalized - Normalized data with x and matrix
 * @returns Mean data with x and y values
 */
export function getMeanData(
  normalized: DataXMatrix<DoubleArray, DoubleMatrix>,
): DataXY<DoubleArray> {
  const matrix = new Matrix(normalized.matrix);
  return {
    x: normalized.x,
    y: matrix.mean('column'),
  };
}
