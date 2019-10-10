import { X } from 'ml-spectra-processing';

/**
 * @private
 */

export function getAutocorrelation(normalized, index) {
  let matrix = normalized.matrix;
  let nbRow = matrix.length;
  let nbColumn = matrix[0].length;
  let array1 = new Float64Array(nbRow);
  let array2 = new Float64Array(nbRow);
  let result = new Array(nbColumn);
  for (let j = 0; j < nbRow; j++) {
    array1[j] = matrix[j][index];
  }
  for (let i = 0; i < nbColumn; i++) {
    for (let j = 0; j < nbRow; j++) {
      array2[j] = matrix[j][i];
    }
    result[i] = X.correlation(array1, array2);
  }
  return {
    x: normalized.x,
    y: result
  };
}
