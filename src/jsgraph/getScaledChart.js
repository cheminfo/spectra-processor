import { addChartDataStyle } from './addChartDataStyle';
/**
 *
 * @param {SpectraProcessor} spectraProcessor
 * @param {object} [options={}] scale spectra based on various parameters
 * @param {object} [options.range] from - to
 * @param {Array} [options.ids] ids of selected spectra
 * @param {string} [options.targetID=spectra[0].id]
 * @param {string} [options.method='max'] min, max, range, minMax
 * @param {Array} [options.ranges] Array of object containing {from:'', to:'', label:''}
 * @param {Array} [options.calculations] Array of object containing {label:'', formula:''}
 * @param {boolean} [options.relative=false]
 */
export function getScaledChart(spectraProcessor, options = {}) {
  let scaled = spectraProcessor.getScaledData(options);

  let chart = {
    data: [],
  };
  if (!scaled || !scaled.matrix) return chart;

  for (let i = 0; i < scaled.matrix.length; i++) {
    let data = {
      x: scaled.x,
      y: Array.from(scaled.matrix[i]), // need to ensure not a typed array
    };
    addChartDataStyle(data, { meta: scaled.meta[i], id: scaled.ids[i] });
    chart.data.push(data);
  }

  return chart;
}
