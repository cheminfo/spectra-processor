import { filterXY } from 'ml-signal-processing';
import { xMinMaxValues, xyCheck } from 'ml-spectra-processing';

/**
 *
 * @private
 * @param {import('cheminfo-types').DataXY} input
 * @param {object} [options={}]
 * @param {number} [options.from=x[0]]
 * @param {number} [options.to=x[x.length-1]]
 * @param {number} [options.numberOfPoints=1024]
 * @param {Array} [options.filters=[]]
 * @param {Array} [options.exclusions=[]]
 * @param {boolean} [options.applyRangeSelectionFirst=false]
 */
export function getNormalized(input, options = {}) {
  xyCheck(input);

  let {
    filters = [],
    from = input.x[0],
    to = input.x.at(-1),
    numberOfPoints = 1024,
    applyRangeSelectionFirst = false,
    exclusions = [],
  } = options;

  filters = structuredClone(filters);
  const equallySpacedFilter = {
    name: 'equallySpaced',
    options: {
      from,
      to,
      numberOfPoints,
      exclusions,
    },
  };
  if (applyRangeSelectionFirst) {
    filters.unshift(equallySpacedFilter);
  } else {
    filters.push(equallySpacedFilter);
  }
  const output = filterXY(input, filters).data;

  const allowedBoundary = {
    x: {
      min: output.x[0],
      max: output.x.at(-1),
    },
    y: xMinMaxValues(output.y),
  };

  return {
    data: output,
    allowedBoundary,
  };
}
