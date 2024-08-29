import { addChartDataStyle } from './addChartDataStyle';

/**
 *
 * @param {SpectraProcessor} spectraProcessor
 * @param {object}   [options={}] - scale spectra based on various parameters
 * @param {Array}    [options.ids] - ids of selected spectra
 * @param {Array}    [options.filters=[]] - Array of object containing {name:'', options:''}
 * @param {object}   [options.scale={}] - object containing the options for rescaling
 * @param {string}   [options.scale.targetID=spectra[0].id]
 * @param {string}   [options.scale.method='max'] - min, max, integration, minMax
 * @param {Array}    [options.scale.range] - from - to to apply the method and rescale
 * @param {boolean}  [options.scale.relative=false]
 */
export function getPostProcessedChart(spectraProcessor, options = {}) {
  let scaled = spectraProcessor.getPostProcessedData(options);

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
