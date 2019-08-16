import { addChartDataStyle } from './addChartDataStyle';

export function getRelativeChart(spectra, targetSpectrum, options = {}) {
  let targetDataY = targetSpectrum.normalized.y;
  const { ids } = options;
  let chart = {
    data: []
  };
  for (let spectrum of spectra) {
    if (!ids || ids.includes(spectrum.id)) {
      let relativeY = new Array(targetDataY.length);
      for (let i = 0; i < targetDataY.length; i++) {
        relativeY[i] = spectrum.normalized.y[i] - targetDataY[i];
      }
      let data = {
        x: spectrum.normalized.x,
        y: relativeY
      };
      addChartDataStyle(data, spectrum);
      chart.data.push(data);
    }
  }
  return chart;
}
