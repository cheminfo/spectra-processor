import { filterXY } from 'ml-signal-processing';
import { xMinMaxValues, xyCheck } from 'ml-spectra-processing';
/**
 *
 * @private
 * @param {DataXY} input
 * @param {object} [options={}]
 * @param {number} [options.from=x[0]]
 * @param {number} [options.to=x[x.length-1]]
 * @param {number} [options.numberOfPoints=1024]
 * @param {array} [options.filters=[]]
 * @param {array} [options.exclusions=[]]
 */
export function getNormalized(input, options = {}) {
  xyCheck(input);

  let {
    from = input.x[0],
    to = input.x[input.x.length - 1],
    numberOfPoints = 1024,
    filters = [],
    exclusions = [],
  } = options;

  // we will add a get
  const equallySpacedFilter = {
    name: 'equallySpaced',
    options: {
      from,
      to,
      numberOfPoints,
      exclusions,
    },
  };
  const output = filterXY(input, filters.concat(equallySpacedFilter)).data;

  const allowedBoundary = {
    x: {
      min: output.x[0],
      max: output.x[output.x.length - 1],
    },
    y: xMinMaxValues(output.y),
  };

  return {
    data: output,
    allowedBoundary,
  };
}
