import { Matrix } from 'ml-matrix';

/**
 * @private
 */

export function getMeanData(normalized) {
  let matrix = new Matrix(normalized.matrix);
  debugger;
  return {
    x: normalized.x,
    y: matrix.mean('column')
  };
}
