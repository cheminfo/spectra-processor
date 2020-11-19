import normed from 'ml-array-normed';
import rescale from 'ml-array-rescale';
import equallySpaced from 'ml-array-xy-equally-spaced';
import Stat from 'ml-stat/array';
import { xAdd, xyXShift } from 'ml-spectra-processing';
import sg from 'ml-savitzky-golay-generalized';
/**
 *
 * @private
 * @param {DataXY} spectrum
 * @param {object} options
 */
export function getNormalized(spectrum, options = {}) {
  if (!Array.isArray(spectrum.x) || !Array.isArray(spectrum.y)) {
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
        let meanFct = (y) => y - mean;
        ys = ys.map(meanFct);
        break;
      }
      case 'scaleSD': {
        let std = Stat.standardDeviation(spectrum.y);
        let stdFct = (y) => y / std;
        ys = ys.map(stdFct);
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
      case 'align': {
        if (
          filterOptions.from === undefined ||
          filterOptions.to === undefined
        ) {
          break;
        }
        let shift = xyXShift(
          { x: xs, y: ys },
          { from: filterOptions.from, to: filterOptions.to },
          { nbPeaks: filterOptions.nbPeaks, targetX: filterOptions.targetX },
        );
        xs = xAdd(xs, shift);
        break;
      }
      case 'sg': {
        ys = sg(ys, xs, filterOptions);
      }
      case 'rescale': {
        ys = sg(ys);
        break;
      }
      case '':
      case undefined:
        break;
      default:
        throw new Error(`Unknown filter kind: ${filter.name}`);
    }
  }

  let result = equallySpaced(
    { x: xs, y: ys },
    { from, to, numberOfPoints, exclusions },
  );
  return result;
}
