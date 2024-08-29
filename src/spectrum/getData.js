import { xyFilterX } from 'ml-spectra-processing';

/**
 *
 * @private
 * @param {Spectrum} spectrum
 * @param {object} [options={}]
 * @param {object} [options.xFilter={}]
 * @param {number} [options.xFilter.from]
 * @param {number} [options.xFilter.to]
 * @param {Array} [options.xFilter.exclusions=[]]
 * @param {number} [options.yFactor=1]
 */

export function getData(spectrum, options = {}) {
  const { xFilter = {}, yFactor = 1 } = options;
  let data = { x: spectrum.x, y: spectrum.y };

  if (xFilter) {
    data = xyFilterX(spectrum, xFilter);
  }
  if (yFactor && yFactor !== 1) {
    data.y = data.y.map((y) => y * yFactor);
  }
  return data;
}
