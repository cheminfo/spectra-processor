import {
  xSubtract,
  xyMaxYPoint,
  xSum,
  probabilisticQuotientNormalization,
} from 'ml-spectra-processing';
import hash from 'object-hash';

import { getNormalizedData } from './getNormalizedData';
import { getFromToIndex } from './scaled/getFromToIndex';
import { integration } from './scaled/integration';
import { max } from './scaled/max';
import { min } from './scaled/min';
import { minMax } from './scaled/minMax';
/**
 * Allows to calculate relative intensity between normalized spectra
 * @param {Array<Spectrum>} spectra
 * @param {object}   [options={}] scale spectra based on various parameters
 * @param {Array}    [options.ids] ids of selected spectra
 * @param {Array}    [options.filters=[]] Array of object containing {name:'', options:''}
 * @param {object}   [options.scale={}] object containing the options for rescaling
 * @param {string}   [options.scale.targetID=spectra[0].id]
 * @param {string}   [options.scale.method='max'] min, max, integration, minMax
 * @param {Array}    [options.scale.range] from - to to apply the method and rescale
 * @param {boolean}  [options.scale.relative=false]
 * @param {Array}    [options.ranges] Array of object containing {from:'', to:'', label:''}
 * @param {Array}    [options.calculations] Array of object containing {label:'', formula:''}
 * @returns {object} { ids:[], matrix:[Array], meta:[object], x:[], ranges:[object] }
 */

let cache = {};

export function getPostProcessedData(spectraProcessor, options = {}) {
  /**
   * could implement a cache if all the options are identical and the normalized data is identical as well
   * in order ot check if the normalized data are identical we should check if the normalized array of all the spectra are identical
   * Because we don't make in-place modification when creating normalized array we can check if the 'pointer' to the object
   * is identical
   */
  const optionsHash = hash(options);

  if (!spectraProcessor.spectra || !spectraProcessor.spectra[0]) return {};
  const { scale = {}, ids, ranges, calculations, filters = [] } = options;

  const { range, targetID, relative, method = '' } = scale;

  let normalizedTarget =
    targetID !== undefined
      ? spectraProcessor.getSpectrum(targetID).normalized
      : spectraProcessor.spectra[0].normalized;
  let spectra = spectraProcessor.getSpectra(ids);

  // are we able to reuse the cache ?
  // we can if the normalized information didn't change and optionsHash is the same
  if (cache.optionsHash === optionsHash) {
    let validCache = true;
    for (let spectrum of spectra) {
      if (!cache.weakMap.get(spectrum.normalized)) validCache = false;
    }
    if (validCache) return cache;
  }
  const weakMap = new WeakMap();
  for (let spectrum of spectra) {
    weakMap.set(spectrum.normalized, true);
  }

  let normalizedData = getNormalizedData(spectra);
  for (let filter of filters) {
    switch (filter.name) {
      case 'pqn': {
        normalizedData.matrix = probabilisticQuotientNormalization(
          normalizedData.matrix,
          filter.options,
        ).data.to2DArray();
        break;
      }
      case '':
      case undefined:
        break;
      default:
        throw new Error(`Unknown matrix filter name: ${filter.name}`);
    }
  }

  switch (method.toLowerCase()) {
    case 'min':
      min(normalizedData.matrix, normalizedTarget, range);
      break;
    case 'max':
      max(normalizedData.matrix, normalizedTarget, range);
      break;
    case 'minmax':
      minMax(normalizedData.matrix, normalizedTarget, range);
      break;
    case 'integration':
      integration(normalizedData.matrix, normalizedTarget, range);
      break;
    case '':
    case undefined:
      break;
    default:
      throw new Error(`getPostProcessedData: unknown method: ${method}`);
  }

  if (relative) {
    for (let i = 0; i < normalizedData.matrix.length; i++) {
      normalizedData.matrix[i] = xSubtract(
        normalizedData.matrix[i],
        normalizedTarget.y,
      );
    }
  }

  if (ranges) {
    normalizedData.ranges = [];
    for (let i = 0; i < normalizedData.matrix.length; i++) {
      let rangesCopy = JSON.parse(JSON.stringify(ranges));
      let yNormalized = normalizedData.matrix[i];
      let resultRanges = {};
      normalizedData.ranges.push(resultRanges);
      for (let currentRange of rangesCopy) {
        if (currentRange.label) {
          let fromToIndex = getFromToIndex(normalizedTarget.x, currentRange);

          let deltaX = normalizedTarget.x[1] - normalizedTarget.x[0];

          currentRange.integration = xSum(yNormalized, fromToIndex) * deltaX;
          currentRange.maxPoint = xyMaxYPoint(
            { x: normalizedData.x, y: yNormalized },
            fromToIndex,
          );
          resultRanges[currentRange.label] = currentRange;
        }
      }
    }
  }

  if (calculations && normalizedData.ranges) {
    normalizedData.calculations = normalizedData.ranges.map(() => {
      return {};
    });
    const parameters = Object.keys(normalizedData.ranges[0]);
    for (let calculation of calculations) {
      // eslint-disable-next-line no-new-func
      const callback = new Function(
        ...parameters,
        `return ${calculation.formula}`,
      );
      for (let i = 0; i < normalizedData.ranges.length; i++) {
        let oneRanges = normalizedData.ranges[i];
        let values = parameters.map((key) => oneRanges[key].integration);
        normalizedData.calculations[i][calculation.label] = callback(...values);
      }
    }
  }

  cache = { ...normalizedData, optionsHash, weakMap };

  return cache;
}
