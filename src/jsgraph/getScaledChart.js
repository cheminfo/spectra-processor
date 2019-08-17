import mean from 'ml-array-mean';
import { XY, X } from 'ml-spectra-processing';

import { addChartDataStyle } from './addChartDataStyle';
/**
 * Scaling all the charts so that they match at a specific point
 * @param {array} spectra
 * @param {number} from
 * @param {number} to
 * @param {object} [options={}]
 * @param {array} [options.ids=[]] List of selected spectra to consider, by default all
 * @param {string} [options.method='max'] min, max, range
 *
 */
export function getScaledChart(spectra, from, to, options = {}) {
  if (!Array.isArray(spectra) || spectra.length < 1) {
    throw new Error('getScaledChart: No spectra');
  }
  if (from === undefined) {
    throw new Error('getScaledChart: `from` as to be defined');
  }
  if (to === undefined) to = from;

  let fromToIndex = {
    fromIndex: X.findClosestIndex(spectra[0].normalized.x, from),
    toIndex: X.findClosestIndex(spectra[0].normalized.x, to)
  };

  const { ids, method = 'max' } = options;

  let methodFct;

  switch (method) {
    case 'min':
      methodFct = (spectrum) => XY.minYPoint(spectrum, fromToIndex).y;
      break;
    case 'max':
      methodFct = (spectrum) => XY.maxYPoint(spectrum, fromToIndex).y;
      break;
    case 'range':
      methodFct = (spectrum) => XY.integration(spectrum, fromToIndex);
      break;
    default:
      throw new Error(`getScaledChart: unknown method: ${method}`);
  }

  const length = spectra[0].normalized.x.length;

  let chart = {
    data: []
  };

  let values = spectra.map((spectrum) => methodFct(spectrum.normalized));
  let meanValue = mean(values);

  for (let i = 0; i < spectra.length; i++) {
    let spectrum = spectra[i];

    if (!ids || ids.includes(spectrum.id)) {
      let factor = meanValue / values[i];
      let scaledY = new Array(length);
      for (let j = 0; j < length; j++) {
        scaledY[j] = spectrum.normalized.y[j] * factor;
      }
      let data = {
        x: spectrum.normalized.x,
        y: scaledY
      };
      addChartDataStyle(data, spectrum);
      chart.data.push(data);
    }
  }
  return chart;
}
