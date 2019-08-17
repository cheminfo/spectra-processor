import { addChartDataStyle } from './addChartDataStyle';
/**
 * Retrieve a chart with selected original data
 * @param {*} options
 */
export function getChart(spectra, options = {}) {
  const { ids, filter = {} } = options;
  let chart = {
    data: []
  };
  for (let spectrum of spectra) {
    if (!ids || ids.includes(spectrum.id)) {
      let data = spectrum.getData({ filter });
      addChartDataStyle(data, spectrum);
      chart.data.push(data);
    }
  }
  return chart;
}
