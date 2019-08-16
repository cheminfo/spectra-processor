import filterX from 'ml-array-xy-filter-x';

/**
 *
 * @param {Spectrum} spectrum
 * @param {object} [filter={}]
 * @param {array} [filter.from]
 * @param {array} [filter.to]
 * @param {array} [filter.exclusions=[]]
 */

export function getData(spectrum, filter = {}) {
  let data = { x: spectrum.x, y: spectrum.y };

  if (filter) {
    data = filterX({ x: spectrum.x, y: spectrum.y }, filter);
  }
  return data;
}
