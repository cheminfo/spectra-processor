import { xSubtract, xyMaxYPoint, xyIntegration } from 'ml-spectra-processing';

import { getNormalizedData } from './getNormalizedData';
import { getFromToIndex } from './scaled/getFromToIndex';
import { max } from './scaled/max';
import { min } from './scaled/min';
import { minMax } from './scaled/minMax';
import { range as rangeFct } from './scaled/range';
/**
 * Allows to calculate relative intensity between normalized spectra
 * @param {Array<Spectrum>} spectra
 * @param {object} [options={}] scale spectra based on various parameters
 * @param {object} [options.range] from - to
 * @param {Array} [options.ids] ids of selected spectra
 * @param {string} [options.targetID=spectra[0].id]
 * @param {string} [options.method='max'] min, max, range, minMax
 * @param {boolean} [options.relative=false]
 * @param {Array} [options.ranges] Array of object containing {from:'', to:'', label:''}
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
      result.matrix[i] = xSubtract(
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
          let fromToIndex = getFromToIndex(
            targetSpectrum.normalized.x,
            currentRange,
          );
          currentRange.integration = xyIntegration(
            { x: result.x, y: yNormalized },
            fromToIndex,
          );
          currentRange.maxPoint = xyMaxYPoint(
            { x: result.x, y: yNormalized },
            fromToIndex,
          );
          resultRanges[currentRange.label] = currentRange;
        }
      }
    }
  }

  if (calculations && result.ranges) {
    result.calculations = result.ranges.map(() => {
      return {};
    });
    const parameters = Object.keys(result.ranges[0]);
    for (let calculation of calculations) {
      // eslint-disable-next-line no-new-func
      const callback = new Function(
        ...parameters,
        `return ${calculation.formula}`,
      );
      for (let i = 0; i < result.ranges.length; i++) {
        let oneRanges = result.ranges[i];
        let values = parameters.map((key) => oneRanges[key].integration);
        result.calculations[i][calculation.label] = callback(...values);
      }
    }
  }

  return result;
}
