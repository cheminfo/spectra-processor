import { xyFilterX } from 'ml-spectra-processing';

import { addChartDataStyle } from './addChartDataStyle.js';

/**
 * @param {Array<Spectrum>} spectra
 * @param {object} [options={}]
 * @param {object} [options.xFilter={}]
 * @param {number} [options.xFilter.from]
 * @param {number} [options.xFilter.to]
 * @param {Array} [options.xFilter.exclusions=[]]
 */

export function getNormalizedChart(spectra, options = {}) {
  const { xFilter } = options;
  let chart = {
    data: [],
  };
  for (let spectrum of spectra) {
    let data = spectrum.normalized;
    if (xFilter) {
      data = xyFilterX(data, xFilter);
    }
    addChartDataStyle(data, spectrum);
    chart.data.push(data);
  }
  return chart;
}
