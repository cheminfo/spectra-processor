import { isAnyArray } from 'is-any-array';
import normed from 'ml-array-normed';
import rescale from 'ml-array-rescale';
import equallySpaced from 'ml-array-xy-equally-spaced';
import sg from 'ml-savitzky-golay-generalized';
import {
  xAdd,
  xyCalibrate,
  xParetoNormalization,
  xyEnsureGrowingX,
} from 'ml-spectra-processing';
import Stat, { minMax } from 'ml-stat/array';

/**
 *
 * @private
 * @param {DataXY} spectrum
 * @param {object} [options={}]
 * @param {number} [options.from=x[0]]
 * @param {number} [options.to=x[x.length-1]]
 * @param {number} [options.numberOfPoints=1024]
 * @param {array} [options.filters=[]]
 * @param {array} [options.exclusions=[]]
 */
export function getNormalized(spectrum, options = {}) {
  if (!isAnyArray(spectrum.x) || !isAnyArray(spectrum.y)) {
    throw new Error(
      'getNormalized: Can not get normalized data, missing original data.',
    );
  }

  let xs = spectrum.x;
  let {
    from = xs[0],
    to = xs[xs.length - 1],
    numberOfPoints = 1024,
    filters = [],
    exclusions = [],
  } = options;

  let ys = spectrum.y.slice(0);

  for (let filter of filters) {
    let filterOptions = filter.options;
    switch (filter.name) {
      case 'centerMean': {
        let mean = Stat.mean(spectrum.y);
        for (let i = 0; i < ys.length; i++) {
          ys[i] -= mean;
        }
        break;
      }
      case 'scaleSD': {
        let std = Stat.standardDeviation(spectrum.y);
        for (let i = 0; i < ys.length; i++) {
          ys[i] /= std;
        }
        break;
      }
      case 'pareto': {
        ys = xParetoNormalization(ys);
        break;
      }
      case 'normalize': {
        ys = normed(ys);
        break;
      }
      case 'rescale': {
        ys = rescale(ys);
        break;
      }
      case 'calibrate': {
        if (
          filterOptions.from === undefined ||
          filterOptions.to === undefined
        ) {
          break;
        }
        let shift = xyCalibrate(
          { x: xs, y: ys },
          { from: filterOptions.from, to: filterOptions.to },
          { nbPeaks: filterOptions.nbPeaks, targetX: filterOptions.targetX },
        );
        xs = xAdd(xs, shift);
        break;
      }
      case 'growingX': {
        const growing = xyEnsureGrowingX({ x: xs, y: ys });
        xs = growing.x;
        ys = growing.y;
        break;
      }
      case 'sg': {
        ys = sg(ys, xs, filterOptions);
        break;
      }
      case 'xFunction': {
        xs = applyArrayFunction(xs, 'x', filterOptions.function);
        break;
      }
      case 'yFunction': {
        ys = applyArrayFunction(ys, 'y', filterOptions.function);
        break;
      }
      case '':
      case undefined:
        break;
      default:
        throw new Error(`Unknown filter kind: ${filter.name}`);
    }
  }

  const allowedBoundary = {
    x: {
      min: xs[0],
      max: xs[xs.length - 1],
    },
    y: minMax(ys),
  };

  let data = equallySpaced(
    { x: xs, y: ys },
    { from, to, numberOfPoints, exclusions },
  );

  return {
    data,
    allowedBoundary,
  };
}

function applyArrayFunction(array, variableLabel, fctString) {
  if (!fctString) fctString = variableLabel;
  fctString = fctString
    .replace(/(^|\W)([a-z]{2,})/g, '$1Math.$2')
    .replace(/Math\.Math/g, 'Math');
  // eslint-disable-next-line no-new-func
  let fct = new Function(variableLabel, `return Number(${fctString})`);
  array = array.slice();
  for (let i = 0; i < array.length; i++) {
    array[i] = fct(array[i]);
    if (isNaN(array[i])) {
      throw Error(
        `The callback ${fctString} does not return a number: ${array[i]}`,
      );
    }
  }
  return array;
}
