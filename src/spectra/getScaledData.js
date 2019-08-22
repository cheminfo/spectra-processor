import { X } from 'ml-spectra-processing';

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
 * @returns {object} { ids:[], matrix:[Array], meta:[object], x:[] }
 */

export function getScaledData(spectraProcessor, options = {}) {
  if (!spectraProcessor.spectra || !spectraProcessor.spectra[0]) return {};
  const { range, targetID, relative, method, ids } = options;

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
        targetSpectrum.normalized.y
      );
    }
  }

  return result;
}
