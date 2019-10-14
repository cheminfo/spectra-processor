import { Matrix } from 'ml-matrix';

/**
 * @private
 */

export function getMeanData(normalized) {
  let matrix = new Matrix(normalized.matrix);
  return {
    x: normalized.x,
    y: matrix.mean('column')
  };
}
