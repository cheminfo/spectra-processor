import filterX from 'ml-array-xy-filter-x';

/**
 *
 * @param {*} spectrum
 * @param {object} [options={}]
 *
 */

export function getData(spectrum, options = {}) {
  const { filter } = options;

  let data = { x: [], y: [] };

  if (filter) {
    data = filterX({ x: spectrum.x, y: spectrum.y }, filter);
  }
  return data;
}
