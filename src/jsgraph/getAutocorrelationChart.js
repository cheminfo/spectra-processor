import { scale } from 'chroma-js';
import { xMinMaxValues, xyFilterX } from 'ml-spectra-processing';

/**
 * Retrieve a chart with autocorrelation color
 * @param {SpectraProcessor} [spectraProcessor]
 * @param {number} [index]
 * @param {object} [options={}]
 * @param {Array} [options.autocorrelation] - precalculated autocorrelation {x,y}
 * @param {Array} - - [options.maxDataPoints=]
 * @param {Array} [options.ids] - ids of the spectra to select, by default all
 * @param {object} [options.xFilter={}]
 * @param {number} [options.xFilter.from]
 * @param {number} [options.xFilter.to]
 * @param {Array} [options.xFilter.exclusions=[]]
 */
export function getAutocorrelationChart(spectraProcessor, index, options = {}) {
  const {
    autocorrelation = spectraProcessor.getAutocorrelation(index, options),
    xFilter,
    ids,
  } = options;

  const { min, max } = xMinMaxValues(autocorrelation.y);
  let colorCallback = scale(['blue', 'cyan', 'yellow', 'red'])
    .domain([min, max])
    .mode('lch');

  let colorScale = autocorrelation.y.map(
    (y) => `rgb(${colorCallback(y).rgb().join(',')})`,
  );

  let mean = spectraProcessor.getMeanData({ ids });
  if (xFilter) {
    mean = xyFilterX({ x: mean.x, y: mean.y }, xFilter);
  }

  let colorSpectrum = {
    type: 'color',
    x: mean.x,
    y: mean.y,
    color: colorScale,
    styles: {
      unselected: {
        lineWidth: 1,
        lineStyle: 1,
      },
      selected: {
        lineWidth: 3,
        lineStyle: 1,
      },
    },
  };

  return colorSpectrum;
}
