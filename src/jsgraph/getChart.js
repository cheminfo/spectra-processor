import { addChartDataStyle } from './addChartDataStyle';
/**
 * Retrieve a chart with selected original data
 * @param {object} [options={}]
 * @param {Array} [options.ids] List of spectra ids, by default all
 * @param {Array} [options.maxDataPoints=]
 */
export function getChart(spectra, options = {}) {
  const { ids } = options;
  let chart = {
    data: [],
  };
  for (let spectrum of spectra) {
    if (!ids || ids.includes(spectrum.id)) {
      let data = spectrum.getData();
      addChartDataStyle(data, spectrum);
      chart.data.push(data);
    }
  }
  return chart;
}
