import { addChartDataStyle } from './addChartDataStyle';

export function getNormalizedChart(spectra, options = {}) {
  const { ids } = options;
  let chart = {
    data: []
  };
  for (let spectrum of spectra) {
    if (!ids || ids.includes(spectrum.id)) {
      let data = spectrum.normalized;
      addChartDataStyle(data, spectrum);
      chart.data.push(data);
    }
  }
  return chart;
}
