import chroma from 'chroma-js';

/**
 * Retrieve a chart with autocorrelation color
 * @param {SpectraProcessor} [spectraProcessor]
 * @param {number} [index]
 * @param {object} [options={}]
 * @param {Array} [options.autocorrelation] precalculated autocorrelation {x,y}
 * @param {Array} [options.maxDataPoints=]
 */
export function getAutocorrelationChart(spectraProcessor, index, options = {}) {
  const {
    autocorrelation = spectraProcessor.getAutocorrelation(index),
  } = options;

  let max = autocorrelation.y.reduce(function (a, b) {
    return isNaN(b) ? a : Math.max(a, b);
  }, Number.MIN_VALUE);

  let min = autocorrelation.y.reduce(function (a, b) {
    return isNaN(b) ? a : Math.min(a, b);
  }, Number.MAX_VALUE);

  let colorCallback = chroma
    .scale(['blue', 'cyan', 'yellow', 'red'])
    .domain([min, max])
    .mode('lch');

  let colorScale = autocorrelation.y.map((y) => colorCallback(y));

  let mean = spectraProcessor.getMeanData();

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
