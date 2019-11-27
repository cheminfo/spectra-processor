import filterX from 'ml-array-xy-filter-x';

/**
 *
 * @private
 * @param {Spectrum} spectrum
 * @param {object} [options.xFilter={}]
 * @param {array} [options.xFilter.from]
 * @param {array} [options.xFilter.to]
 * @param {array} [options.xFilter.exclusions=[]]
 * @param {array} [options.yFactor=1]
 */

export function getData(spectrum, options = {}) {
  const { xFilter = {}, yFactor = 1 } = options;
  let data = { x: spectrum.x, y: spectrum.y };

  if (xFilter) {
    data = filterX({ x: spectrum.x, y: spectrum.y }, xFilter);
  }
  if (yFactor && yFactor !== 1) {
    data.y = data.y.map((y) => y * yFactor);
  }
  return data;
}
