import { xBoxPlot } from 'ml-spectra-processing';

/**
 * @private
 * @param {*} spectra
 */

export function getBoxPlotData(spectra) {
  let matrix = [];
  let x = spectra[0].normalized.x;
  for (let spectrum of spectra) {
    matrix.push(spectrum.normalized.y);
  }

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
