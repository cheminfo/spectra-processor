import normed from 'ml-array-normed';
import rescale from 'ml-array-rescale';
import equallySpaced from 'ml-array-xy-equally-spaced';
import Stat from 'ml-stat/array';
import { xAdd, xyXShift } from 'ml-spectra-processing';

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
        let shift = xyXShift(
          { x: xs, y: ys },
          { from: filter.options.from, to: filter.options.to },
          { nbPeaks: filter.options.nbPeaks, targetX: filter.options.targetX },
        );
        xs = xAdd(xs, shift);
        break;
      }
      case '':
      case undefined:
        break;
      default:
        throw new Error(`Unknown process kind: ${process.kind}`);
    }
  }

  let result = equallySpaced(
    { x: xs, y: ys },
    { from, to, numberOfPoints, exclusions },
  );
  return result;
}
