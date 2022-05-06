import { xBoxPlot } from 'ml-spectra-processing';

/**
 * @private
 * @param {object} normalizedData
 * @returns {x:[],q1:[],q3:[],media:[],min:[],max:[]}
 */

export function getBoxPlotData(normalizedData) {
  const { x, matrix } = normalizedData;
  let nbRow = matrix.length;
  let nbColumn = matrix[0].length;
  let result;
  let aColumn = new Float64Array(nbRow);
  for (let column = 0; column < nbColumn; column++) {
    for (let row = 0; row < nbRow; row++) {
      aColumn[row] = matrix[row][column];
    }
    let info = xBoxPlot(aColumn);
    if (!result) {
      result = { x };
      for (let key in info) {
        result[key] = [];
      }
    }
    for (let key in info) {
      result[key].push(info[key]);
    }
  }
  return result;
}
