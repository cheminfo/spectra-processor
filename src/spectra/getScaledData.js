import { X, XY } from 'ml-spectra-processing';

import { getNormalizedData } from './getNormalizedData';
import { min } from './scaled/min';
import { max } from './scaled/max';
import { minMax } from './scaled/minMax';
import { range as rangeFct } from './scaled/range';

/**
 * @private
 * @param {Array<Spectrum>} spectra
 * @param {object} [options={}] scale spectra based on various parameters
 * @param {object} [options.range] from - to
 * @param {Array} [options.ids] ids of selected spectra
 * @param {string} [options.targetID=spectra[0].id]
 * @param {string} [options.method='max'] min, max, range, minMax
 * @param {boolean} [options.relative=false]
 * @param {Array} [options.ranges] Array of object containing {from:'', to:'', labe:''}
 * @param {Array} [options.calculations] Array of object containing {label:'', formula:''}
 * @returns {object} { ids:[], matrix:[Array], meta:[object], x:[], ranges:[object] }
 */

export function getScaledData(spectraProcessor, options = {}) {
  if (!spectraProcessor.spectra || !spectraProcessor.spectra[0]) return {};
  const {
    range,
    targetID,
    relative,
    method,
    ids,
    ranges,
    calculations,
  } = options;
  let targetSpectrum =
    spectraProcessor.getSpectrum(targetID) || spectraProcessor.spectra[0];
  let spectra = spectraProcessor.getSpectra(ids);
  let result;

  if (method === '' || method === undefined) {
    result = getNormalizedData(spectra);
  } else {
    let matrix;
    switch (method.toLowerCase()) {
      case 'min':
        matrix = min(spectra, targetSpectrum, range);
        break;
      case 'max':
        matrix = max(spectra, targetSpectrum, range);
        break;
      case 'minmax':
        matrix = minMax(spectra, targetSpectrum, range);
        break;
      case 'range':
        matrix = rangeFct(spectra, targetSpectrum, range);
        break;
      default:
        throw new Error(`getScaledData: unknown method: ${method}`);
    }
    let meta = [];
    let currentIDs = [];
    for (let spectrum of spectra) {
      currentIDs.push(spectrum.id);
      meta.push(spectrum.meta);
    }
    let x = spectra[0].normalized.x;
    result = { ids: currentIDs, matrix, meta, x };
  }

  if (relative) {
    for (let i = 0; i < result.matrix.length; i++) {
      result.matrix[i] = X.subtract(
        result.matrix[i],
        targetSpectrum.normalized.y,
      );
    }
  }

  if (ranges) {
    result.ranges = [];
    for (let i = 0; i < result.matrix.length; i++) {
      let rangesCopy = JSON.parse(JSON.stringify(ranges));
      let yNormalized = result.matrix[i];
      let resultRanges = {};
      result.ranges.push(resultRanges);
      for (let currentRange of rangesCopy) {
        if (currentRange.label) {
          let fromToIndex = {
            fromIndex: X.findClosestIndex(result.x, currentRange.from),
            toIndex: X.findClosestIndex(result.x, currentRange.to),
          };
          currentRange.integration = XY.integration(
            { x: result.x, y: yNormalized },
            fromToIndex,
          );
          currentRange.maxPoint = XY.maxYPoint(
            { x: result.x, y: yNormalized },
            fromToIndex,
          );
          resultRanges[currentRange.label] = currentRange;
        }
      }
    }
  }

  if (calculations && result.ranges) {
    const parameters = Object.keys(result.ranges[0]);
    for (let calculation of calculations) {
      // eslint-disable-next-line no-new-func
      const callback = new Function(
        ...parameters,
        `return ${calculation.formula}`,
      );
      for (let oneRanges of result.ranges) {
        let values = parameters.map((key) => oneRanges[key].integration);
        oneRanges[calculation.label] = callback(...values);
      }
    }
  }

  return result;
}
