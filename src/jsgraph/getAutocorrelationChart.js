import chroma from 'chroma-js';
import maxFct from 'ml-array-max';
import minFct from 'ml-array-min';
import filterX from 'ml-array-xy-filter-x';

/**
 * Retrieve a chart with autocorrelation color
 * @param {SpectraProcessor} [spectraProcessor]
 * @param {number} [index]
 * @param {object} [options={}]
 * @param {Array} [options.autocorrelation] precalculated autocorrelation {x,y}
 * @param {Array} [options.maxDataPoints=]
 * @param {Array} [options.ids] ids of the spectra to select, by default all
 * @param {array} [options.xFilter.from]
 * @param {array} [options.xFilter.to]
 * @param {array} [options.xFilter.exclusions=[]]
 */
export function getAutocorrelationChart(spectraProcessor, index, options = {}) {
  const {
    autocorrelation = spectraProcessor.getAutocorrelation(index, options),
    xFilter,
    ids,
  } = options;

  let max = maxFct(autocorrelation.y);
  let min = minFct(autocorrelation.y);

  let colorCallback = chroma
    .scale(['blue', 'cyan', 'yellow', 'red'])
    .domain([min, max])
    .mode('lch');

  let colorScale = autocorrelation.y.map(
    (y) => `rgb(${colorCallback(y).rgb().join()})`,
  );

  let mean = spectraProcessor.getMeanData({ ids });
  if (xFilter) {
    mean = filterX({ x: mean.x, y: mean.y }, xFilter);
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
